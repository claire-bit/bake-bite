import hmac
import json
import logging

import requests
from django.conf import settings
from django.shortcuts import get_object_or_404
from rest_framework import serializers, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from orders.models import Order

from . import mpesa, paystack
from .models import Payment
from .services import finalize

log = logging.getLogger(__name__)

ACK = {"ResultCode": 0, "ResultDesc": "Accepted"}


class MpesaInitiateSerializer(serializers.Serializer):
    order_id = serializers.IntegerField()
    phone = serializers.CharField()


class PaystackInitiateSerializer(serializers.Serializer):
    order_id = serializers.IntegerField()


def _payable_order(request, order_id):
    order = get_object_or_404(Order, pk=order_id, user=request.user)
    if order.status == "paid":
        return order, Response(
            {"detail": "Order is already paid."}, status=status.HTTP_409_CONFLICT
        )
    return order, None


class MpesaInitiateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        s = MpesaInitiateSerializer(data=request.data)
        s.is_valid(raise_exception=True)

        order, error = _payable_order(request, s.validated_data["order_id"])
        if error:
            return error

        try:
            phone = mpesa.normalize_phone(s.validated_data["phone"])
        except ValueError as exc:
            return Response({"phone": [str(exc)]}, status=status.HTTP_400_BAD_REQUEST)

        payment = Payment.objects.create(
            order=order,
            provider=Payment.Provider.MPESA,
            amount=order.total,
            phone=phone,
        )

        callback_url = (
            f"{settings.PUBLIC_BASE_URL}/payments/mpesa/callback/"
            f"{settings.MPESA_CALLBACK_SECRET}/"
        )
        try:
            resp = mpesa.stk_push(
                phone=phone,
                amount=payment.amount,
                reference=f"ORDER{order.pk}",
                description="BakeAndBite",
                callback_url=callback_url,
            )
        except requests.RequestException:
            log.exception("STK push failed")
            finalize(payment.id, success=False, reason="Could not reach M-Pesa")
            return Response(
                {"detail": "M-Pesa is unavailable. Try again."},
                status=status.HTTP_502_BAD_GATEWAY,
            )

        if resp.get("ResponseCode") != "0":
            finalize(
                payment.id,
                success=False,
                reason=resp.get("ResponseDescription", ""),
                raw=resp,
            )
            return Response(
                {"detail": "M-Pesa rejected the request."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        payment.provider_reference = resp["CheckoutRequestID"]
        payment.save(update_fields=["provider_reference", "updated_at"])
        return Response(
            {"payment_id": str(payment.id), "status": payment.status},
            status=status.HTTP_202_ACCEPTED,
        )


class MpesaCallbackView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def post(self, request, secret):
        if not hmac.compare_digest(secret, settings.MPESA_CALLBACK_SECRET):
            return Response(status=status.HTTP_404_NOT_FOUND)

        cb = (request.data or {}).get("Body", {}).get("stkCallback", {})
        payment = Payment.objects.filter(
            provider=Payment.Provider.MPESA,
            provider_reference=cb.get("CheckoutRequestID", ""),
        ).first()
        if not payment:
            return Response(ACK)

        if cb.get("ResultCode") == 0:
            items = {
                i["Name"]: i.get("Value")
                for i in cb.get("CallbackMetadata", {}).get("Item", [])
            }
            finalize(
                payment.id,
                success=True,
                receipt=str(items.get("MpesaReceiptNumber", "")),
                paid_amount=items.get("Amount"),
                raw=cb,
            )
        else:
            finalize(
                payment.id,
                success=False,
                reason=cb.get("ResultDesc", "Payment failed"),
                raw=cb,
            )
        return Response(ACK)


class PaystackInitiateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        s = PaystackInitiateSerializer(data=request.data)
        s.is_valid(raise_exception=True)

        order, error = _payable_order(request, s.validated_data["order_id"])
        if error:
            return error

        payment = Payment.objects.create(
            order=order, provider=Payment.Provider.PAYSTACK, amount=order.total
        )
        payment.provider_reference = payment.id.hex
        payment.save(update_fields=["provider_reference", "updated_at"])

        try:
            data = paystack.initialize(
                email=request.user.email,
                amount_kes=payment.amount,
                reference=payment.provider_reference,
                callback_url=f"{settings.FRONTEND_URL}/checkout/complete?payment={payment.id}",
            )
        except requests.RequestException:
            log.exception("Paystack initialize failed")
            finalize(payment.id, success=False, reason="Could not reach Paystack")
            return Response(
                {"detail": "Card payments are unavailable. Try again."},
                status=status.HTTP_502_BAD_GATEWAY,
            )

        return Response(
            {
                "payment_id": str(payment.id),
                "authorization_url": data["authorization_url"],
            },
            status=status.HTTP_201_CREATED,
        )


class PaystackWebhookView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def post(self, request):
        raw = request.body
        if not paystack.valid_signature(
            raw, request.headers.get("x-paystack-signature", "")
        ):
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        event = json.loads(raw)
        if event.get("event") != "charge.success":
            return Response(status=status.HTTP_200_OK)

        reference = event["data"]["reference"]
        payment = Payment.objects.filter(
            provider=Payment.Provider.PAYSTACK, provider_reference=reference
        ).first()
        if not payment:
            return Response(status=status.HTTP_200_OK)

        try:
            data = paystack.verify(reference)
        except requests.RequestException:
            return Response(status=status.HTTP_503_SERVICE_UNAVAILABLE)

        ok = data.get("status") == "success" and data.get("currency") == "KES"
        finalize(
            payment.id,
            success=ok,
            receipt=str(data.get("id", "")),
            reason="" if ok else f"Paystack status: {data.get('status')}",
            paid_amount=data.get("amount", 0) // 100,
            raw=data,
        )
        return Response(status=status.HTTP_200_OK)


class PaymentStatusView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        payment = get_object_or_404(Payment, pk=pk, order__user=request.user)
        return Response(
            {
                "payment_id": str(payment.id),
                "provider": payment.provider,
                "status": payment.status,
                "receipt": payment.receipt,
                "failure_reason": payment.failure_reason,
            }
        )