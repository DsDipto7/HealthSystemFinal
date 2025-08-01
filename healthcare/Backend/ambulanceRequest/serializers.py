from rest_framework import serializers
from .models import AmbulanceRequest

class AmbulanceRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = AmbulanceRequest
        fields = '__all__'
