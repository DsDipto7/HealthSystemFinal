from django.urls import path
from .views import DoctorProfileAPIView

urlpatterns = [
    path('profile/', DoctorProfileAPIView.as_view(), name='doctor-profile'),
]
