from rest_framework import serializers

from .models import Category, Product


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("id", "name", "slug")


class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    avg_rating = serializers.SerializerMethodField()
    review_count = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = (
            "id", "name", "slug", "description", "price", "image",
            "category", "is_available", "is_featured",
            "avg_rating", "review_count",
        )

    def get_avg_rating(self, obj):
        value = getattr(obj, "avg_rating", None)
        return round(value, 1) if value is not None else None

    def get_review_count(self, obj):
        return getattr(obj, "review_count", 0)