from django.contrib import admin

from .models import Payment


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "order",
        "provider",
        "status",
        "amount",
        "phone",
        "receipt",
        "created_at",
    )
    list_filter = ("provider", "status", "created_at")
    search_fields = ("id", "provider_reference", "receipt", "phone", "order__id")
    readonly_fields = (
        "id",
        "order",
        "provider",
        "amount",
        "phone",
        "provider_reference",
        "receipt",
        "failure_reason",
        "raw_response",
        "created_at",
        "updated_at",
    )

    def has_add_permission(self, request):
        return False