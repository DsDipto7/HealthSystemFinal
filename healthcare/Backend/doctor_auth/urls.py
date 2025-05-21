from django.urls import path
from .views import DoctorLoginAPIView, get_csrf,DoctorUpdateAPIView

urlpatterns = [
    path('login/', DoctorLoginAPIView.as_view(), name='doctor-login'),
    path('get-csrf/', get_csrf, name='get-csrf'),
    path('update/<int:doctor_id>/', DoctorUpdateAPIView.as_view(), name='doctor-update'),

]
