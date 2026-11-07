from django.db.models import Avg, Count
from rest_framework import filters, generics
from rest_framework.permissions import AllowAny

from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer


class PublicMixin:
    authentication_classes = []  # a stale token must not break public pages
    permission_classes = [AllowAny]


def _products():
    return Product.objects.select_related("category").annotate(
        avg_rating=Avg("reviews__rating"), review_count=Count("reviews")
    )


class ProductListView(PublicMixin, generics.ListAPIView):
    """GET /products/?category=<slug>&featured=true&search=<text>"""

    serializer_class = ProductSerializer
    pagination_class = None
    filter_backends = [filters.SearchFilter]
    search_fields = ["name", "description"]

    def get_queryset(self):
        qs = _products().filter(is_available=True)
        category = self.request.query_params.get("category")
        if category:
            qs = qs.filter(category__slug=category)
        if self.request.query_params.get("featured") == "true":
            qs = qs.filter(is_featured=True)
        return qs


class ProductDetailView(PublicMixin, generics.RetrieveAPIView):
    serializer_class = ProductSerializer
    lookup_field = "slug"

    def get_queryset(self):
        return _products()


class CategoryListView(PublicMixin, generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    pagination_class = None