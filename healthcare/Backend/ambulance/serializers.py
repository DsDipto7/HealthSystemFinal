from rest_framework import serializers
from .models import Ambulance

class AmbulanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ambulance
        fields = '__all__'
