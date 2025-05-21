from rest_framework import serializers
from .models import Stripe_Payment

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stripe_Payment
        fields = ['id', 'amount', 'currency', 'stripe_payment_id', 'created_at','user_email']

