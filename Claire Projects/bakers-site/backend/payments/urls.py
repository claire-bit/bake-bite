from django.urls import path

from . import views

app_name = "payments"

urlpatterns = [
    path("mpesa/stk-push/", views.MpesaInitiateView.as_view()),
    path("mpesa/callback/<str:secret>/", views.MpesaCallbackView.as_view()),
    path("paystack/initialize/", views.PaystackInitiateView.as_view()),
    path("paystack/webhook/", views.PaystackWebhookView.as_view()),
    path("<uuid:pk>/", views.PaymentStatusView.as_view()),
]