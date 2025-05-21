from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from .models import Transaction
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Transaction
from .serializers import TransactionSerializer



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_transactions(request):
    user_email = request.user.email
    transactions = Transaction.objects.filter(user_email=user_email)
    serializer = TransactionSerializer(transactions, many=True)
    return Response(serializer.data)

def get_transactions(request):
    transactions = Transaction.objects.all().values(
        'id', 'amount', 'currency', 'stripe_payment_id', 'created_at', 'user_email'
    )
    return JsonResponse(list(transactions), safe=False)
    