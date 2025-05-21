from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import ListAPIView
import stripe
import json
from django.conf import settings
from .models import Stripe_Payment
from .serializers import PaymentSerializer
from .utils import convert_bdt_to_usd

from rest_framework import generics, permissions
from rest_framework.response import Response
from payments.models import Stripe_Payment
from accounts.serializers import PaymentSerializer  # keep this import if serializer is in accounts



stripe.api_key = settings.STRIPE_SECRET_KEY

class PaymentListView(ListAPIView):
    queryset = Stripe_Payment.objects.all()
    serializer_class = PaymentSerializer

class CreatePaymentIntentView(APIView):
    def post(self, request):
        try:
            data = json.loads(request.body.decode("utf-8"))
            amount_in_bdt = data.get("amount")
            email = data.get("user_email")
        except json.JSONDecodeError:
            return Response({'error': 'Invalid JSON format'}, status=400)

        if not email:
            return Response({'error': 'Invalid email'}, status=400)
        if not amount_in_bdt or int(amount_in_bdt) <= 0:
            return Response({'error': 'Invalid amount'}, status=400)

        # Convert BDT to USD
        try:
            amount_in_usd_cents = convert_bdt_to_usd(int(amount_in_bdt))
        except Exception as e:
            return Response({'error': f'Currency conversion failed: {str(e)}'}, status=400)

        # Create the Stripe payment intent
        try:
            intent = stripe.PaymentIntent.create(
                amount=amount_in_usd_cents,
                currency="usd",
            )
            payment_data = {
                'amount': amount_in_bdt,
                'currency': "bdt",
                'stripe_payment_id': intent['id'],
                'user_email': email
            }
            serializer = PaymentSerializer(data=payment_data)
            if serializer.is_valid():
                serializer.save()
                return Response({
                    'clientSecret': intent['client_secret'],
                    'payment': serializer.data,
                }, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except stripe.error.StripeError as e:
            return Response({'error': str(e)}, status=400)
# -------------------------
# PAYMENTS
# -------------------------

class PaymentHistoryView(generics.ListAPIView):
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Stripe_Payment.objects.filter(user_email=self.request.user.email)