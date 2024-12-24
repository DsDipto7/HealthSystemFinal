# contact/urls.py
from django.urls import path
from .views import contact_create

urlpatterns = [
    path('contact/', contact_create, name='contact-create'),
]
