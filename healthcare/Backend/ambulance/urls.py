from django.urls import path
from .views import get_ambulances, create_ambulance, get_ambulance_by_id, update_ambulance, delete_ambulance

urlpatterns = [
    path('', get_ambulances, name='get_ambulances'),
    path('create/', create_ambulance, name='create_ambulance'),
    path('<int:pk>/', get_ambulance_by_id, name='get_ambulance_by_id'),
    path('<int:pk>/update/', update_ambulance, name='update_ambulance'),
    path('<int:pk>/delete/', delete_ambulance, name='delete_ambulance'),
]
