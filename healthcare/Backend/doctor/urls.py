from django.urls import path
from .views import get_doctors, create_doctor, update_doctor, delete_doctor

urlpatterns = [
    path('', get_doctors, name='get_doctors'),
    path('create/', create_doctor, name='create_doctor'),
    path('<int:pk>/update/', update_doctor, name='update_doctor'),
    path('<int:pk>/delete/', delete_doctor, name='delete_doctor'),
]
