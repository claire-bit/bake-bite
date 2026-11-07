from rest_framework import serializers

from products.models import Product

from .models import Review


class ReviewSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())
    user_name = serializers.SerializerMethodField()

    class Meta:
        model = Review
        fields = ("id", "product", "user_name", "rating", "comment", "created_at")
        read_only_fields = ("id", "user_name", "created_at")

    def get_user_name(self, obj):
        return obj.user.first_name or "Customer"

    def update(self, instance, validated_data):
        validated_data.pop("product", None)  # product can't change after creation
        return super().update(instance, validated_data)