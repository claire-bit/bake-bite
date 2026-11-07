from django.urls import path

from . import views

urlpatterns = [
    path("", views.ReviewListCreateView.as_view()),
    path("<int:pk>/", views.ReviewDetailView.as_view()),
]