# transactions/urls.py
from django.urls import path
from .views import get_transactions

urlpatterns = [
    path('api/transactions/', get_transactions, name='get_transactions'),
]