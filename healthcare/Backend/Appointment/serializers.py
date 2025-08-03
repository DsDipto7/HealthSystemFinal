# appointments/serializers.py
from rest_framework import serializers
from .models import Appointment
from doctor.models import Doctor

class DoctorShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ['id', 'name']


class AppointmentSerializer(serializers.ModelSerializer):
    doctor = DoctorShortSerializer(read_only=True)
    user = serializers.SerializerMethodField()

    def get_user(self, obj):
        return {"id": obj.user.id, "username": obj.user.username}

    class Meta:
        model = Appointment
        fields = '__all__'  # includes room, status, is_call_started, etc.
        read_only_fields = ['user', 'room', 'status', 'is_call_started', 'is_call_ended']

    def validate(self, data):
        request_data = self.context['request'].data
        if not request_data.get('reason'):
            raise serializers.ValidationError("Reason for appointment is required.")
        if not request_data.get('date'):
            raise serializers.ValidationError("Appointment date is required.")
        if not request_data.get('time'):
            raise serializers.ValidationError("Appointment time is required.")
        return data
