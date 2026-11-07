from rest_framework import generics
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import AllowAny, IsAuthenticated

from .models import Review
from .serializers import ReviewSerializer


class ReviewListCreateView(generics.ListCreateAPIView):
    """GET /reviews/?product=<id> is public. POST needs a login."""

    serializer_class = ReviewSerializer
    pagination_class = None

    def get_permissions(self):
        return [AllowAny()] if self.request.method == "GET" else [IsAuthenticated()]

    def get_queryset(self):
        qs = Review.objects.select_related("user")
        product = self.request.query_params.get("product")
        return qs.filter(product_id=product) if product else qs

    def perform_create(self, serializer):
        product = serializer.validated_data["product"]
        if Review.objects.filter(user=self.request.user, product=product).exists():
            raise ValidationError({"detail": "You already reviewed this product."})
        serializer.save(user=self.request.user)


class ReviewDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Users can only edit or delete their own reviews."""

    serializer_class = ReviewSerializer

    def get_queryset(self):
        return Review.objects.filter(user=self.request.user)