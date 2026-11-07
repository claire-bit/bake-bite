from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView

from products.models import Product

from .models import Cart, CartItem
from .serializers import AddToCartSerializer, CartSerializer, QuantitySerializer

MAX_QTY = 20


def _cart(user):
    cart, _ = Cart.objects.get_or_create(user=user)
    return cart


def _cart_response(request, status=200):
    data = CartSerializer(_cart(request.user), context={"request": request}).data
    return Response(data, status=status)


class CartView(APIView):
    def get(self, request):
        return _cart_response(request)

    def delete(self, request):
        _cart(request.user).items.all().delete()
        return _cart_response(request)


class CartItemAddView(APIView):
    def post(self, request):
        s = AddToCartSerializer(data=request.data)
        s.is_valid(raise_exception=True)
        product = get_object_or_404(
            Product, pk=s.validated_data["product_id"], is_available=True
        )
        qty = s.validated_data["quantity"]
        item, created = CartItem.objects.get_or_create(
            cart=_cart(request.user), product=product, defaults={"quantity": qty}
        )
        if not created:
            item.quantity = min(item.quantity + qty, MAX_QTY)
            item.save(update_fields=["quantity"])
        return _cart_response(request, status=201)


class CartItemDetailView(APIView):
    def patch(self, request, pk):
        s = QuantitySerializer(data=request.data)
        s.is_valid(raise_exception=True)
        item = get_object_or_404(CartItem, pk=pk, cart__user=request.user)
        item.quantity = s.validated_data["quantity"]
        item.save(update_fields=["quantity"])
        return _cart_response(request)

    def delete(self, request, pk):
        get_object_or_404(CartItem, pk=pk, cart__user=request.user).delete()
        return _cart_response(request)