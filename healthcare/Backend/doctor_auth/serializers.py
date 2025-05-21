

# doctor_auth/serializers.py
from rest_framework import serializers

class DoctorLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    license_number = serializers.CharField(max_length=6)