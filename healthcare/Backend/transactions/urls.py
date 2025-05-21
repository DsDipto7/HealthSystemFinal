# transactions/urls.py
from django.urls import path
from .views import get_transactions, user_transactions

urlpatterns = [
    path('api/transactions/', get_transactions, name='get_transactions'),
    # path('user/', user_transactions, name='user_transactions'),

]