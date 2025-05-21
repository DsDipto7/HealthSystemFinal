from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from doctor.models import Doctor
from .serializers import DoctorProfileSerializer
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

@method_decorator(csrf_exempt, name='dispatch')
class DoctorProfileAPIView(APIView):
    def post(self, request):
        # Authenticate doctor using email and license_number
        email = request.data.get('email')
        license_number = request.data.get('license_number')

        if not email or not license_number:
            return Response({'detail': 'Email and license number are required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            doctor = Doctor.objects.get(email=email, license_number=license_number)
        except Doctor.DoesNotExist:
            return Response({'detail': 'Invalid email or license number.'}, status=status.HTTP_401_UNAUTHORIZED)

        serializer = DoctorProfileSerializer(doctor)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request):
        # Authenticate doctor
        email = request.data.get('email')
        license_number = request.data.get('license_number')

        if not email or not license_number:
            return Response({'detail': 'Email and license number are required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            doctor = Doctor.objects.get(email=email, license_number=license_number)
        except Doctor.DoesNotExist:
            return Response({'detail': 'Invalid email or license number.'}, status=status.HTTP_401_UNAUTHORIZED)

        serializer = DoctorProfileSerializer(doctor, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Profile updated successfully.', 'data': serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
