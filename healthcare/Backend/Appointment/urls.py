 # appointments/urls.py
from django.urls import path
from .views import create_appointment, user_appointments, doctor_appointments, update_appointment_status,delete_appointment, mark_call_started, mark_call_ended

urlpatterns = [
    path('', create_appointment, name='create-appointment'),
    path('my/', user_appointments, name='my-appointments'),
    path('doctor/<int:doctor_id>/', doctor_appointments, name='doctor-appointments'),
    path('update-status/<int:appointment_id>/', update_appointment_status, name='update-appointment-status'),
    path('delete/<int:appointment_id>/', delete_appointment, name='delete-appointment'),
    path('call-started/<int:appointment_id>/', mark_call_started, name='mark-call-started'),
   path('call-ended/<int:appointment_id>/', mark_call_ended, name='mark-call-ended'),

]