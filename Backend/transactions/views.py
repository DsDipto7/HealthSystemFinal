from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from .models import Transaction

def get_transactions(request):
    transactions = Transaction.objects.all().values(
        'id', 'amount', 'currency', 'stripe_payment_id', 'created_at', 'user_email'
    )
    return JsonResponse(list(transactions), safe=False)
    