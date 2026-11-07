import uuid

from django.db import models


class Payment(models.Model):
    class Provider(models.TextChoices):
        MPESA = "mpesa", "M-Pesa"
        PAYSTACK = "paystack", "Paystack"

    class Status(models.TextChoices):
        PENDING = "pending", "Pending"
        SUCCESS = "success", "Success"
        FAILED = "failed", "Failed"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    order = models.ForeignKey(
        "orders.Order", on_delete=models.PROTECT, related_name="payments"
    )
    provider = models.CharField(max_length=20, choices=Provider.choices)
    status = models.CharField(
        max_length=20, choices=Status.choices, default=Status.PENDING, db_index=True
    )
    amount = models.PositiveIntegerField(help_text="Whole Kenyan shillings")
    phone = models.CharField(max_length=15, blank=True)
    provider_reference = models.CharField(max_length=100, blank=True, db_index=True)
    receipt = models.CharField(max_length=50, blank=True)
    failure_reason = models.CharField(max_length=255, blank=True)
    raw_response = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.provider} {self.amount} KES [{self.status}]"