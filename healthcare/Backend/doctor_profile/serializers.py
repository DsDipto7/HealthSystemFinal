from rest_framework import serializers
from doctor.models import Doctor

class DoctorProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = [
            'name',
            'photo',
            'qualification',
            'college_name',
            'specialist',
            'bio',
            'experience',
            'consultation_fee',
            'available_time'
        ]
