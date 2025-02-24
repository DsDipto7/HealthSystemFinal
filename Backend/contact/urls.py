# contact/urls.py
from django.urls import path
from .views import contact_create,contact_list

urlpatterns = [
    path('contact/', contact_create, name='contact-create'),
    path('contact-list/', contact_list, name='contact-list'),
]
