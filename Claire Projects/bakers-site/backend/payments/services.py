from django.db import transaction

from .models import Payment


@transaction.atomic
def finalize(payment_id, *, success, receipt="", reason="", raw=None, paid_amount=None):
    """Settle a payment exactly once. Safe to call repeatedly (gateways retry)."""
    payment = (
        Payment.objects.select_for_update(of=("self",))
        .select_related("order")
        .get(pk=payment_id)
    )

    if payment.status != Payment.Status.PENDING:
        return payment

    if success and paid_amount is not None and int(paid_amount) != payment.amount:
        success = False
        reason = f"Amount mismatch: expected {payment.amount}, got {paid_amount}"

    payment.status = Payment.Status.SUCCESS if success else Payment.Status.FAILED
    payment.receipt = receipt or payment.receipt
    payment.failure_reason = "" if success else (reason or "")[:255]
    if raw is not None:
        payment.raw_response = raw
    payment.save()

    if success:
        order = payment.order
        if order.status != "paid":
            order.status = "paid"
            order.save(update_fields=["status"])

    return payment