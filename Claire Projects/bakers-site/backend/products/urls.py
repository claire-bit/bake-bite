from django.urls import path

from . import views

urlpatterns = [
    path("", views.ProductListView.as_view()),
    path("categories/", views.CategoryListView.as_view()),
    path("<slug:slug>/", views.ProductDetailView.as_view()),
]