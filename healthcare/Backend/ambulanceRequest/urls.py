from django.urls import path
from .views import create_ambulance_request, list_ambulance_requests

urlpatterns = [
    path('request/', create_ambulance_request),
    path('list/', list_ambulance_requests),
]
