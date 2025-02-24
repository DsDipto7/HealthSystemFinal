
from django.urls import path
from .views import CreatePaymentIntentView, PaymentListView  # Ensure this import is correct

urlpatterns = [
    path("", PaymentListView.as_view(), name="payment-list"),
    path('create-payment-intent/', CreatePaymentIntentView.as_view(), name='create-payment-intent'),
]



