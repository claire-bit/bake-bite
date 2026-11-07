from django.db import transaction
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView

from cart.models import Cart

from .models import Order, OrderItem
from .serializers import OrderSerializer


class OrderListView(generics.ListAPIView):
    serializer_class = OrderSerializer

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).prefetch_related("items")


class OrderDetailView(generics.RetrieveAPIView):
    serializer_class = OrderSerializer

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).prefetch_related("items")


class CheckoutView(APIView):
    """Turn the user's cart into a pending order. Totals are computed server-side."""

    def post(self, request):
        cart = Cart.objects.filter(user=request.user).first()
        items = list(cart.items.select_related("product")) if cart else []

        if not items:
            return Response({"detail": "Your cart is empty."}, status=400)

        unavailable = [i.product.name for i in items if not i.product.is_available]
        if unavailable:
            return Response(
                {"detail": f"No longer available: {', '.join(unavailable)}"},
                status=400,
            )

        with transaction.atomic():
            order = Order.objects.create(
                user=request.user, total=sum(i.subtotal for i in items)
            )
            OrderItem.objects.bulk_create(
                [
                    OrderItem(
                        order=order,
                        product=i.product,
                        product_name=i.product.name,
                        unit_price=i.product.price,
                        quantity=i.quantity,
                    )
                    for i in items
                ]
            )
            cart.items.all().delete()

        return Response(OrderSerializer(order).data, status=201)