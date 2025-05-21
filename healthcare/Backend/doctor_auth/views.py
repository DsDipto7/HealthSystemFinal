
#this  is my previous  code

# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from doctor.models import Doctor
# from django.views.decorators.csrf import ensure_csrf_cookie
# from django.utils.decorators import method_decorator



# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from django.contrib.auth import login, get_user_model
# from .serializers import DoctorLoginSerializer
# from doctor.models import Doctor
# from django.views.decorators.csrf import ensure_csrf_cookie
# from django.http import JsonResponse

# # Add this new function for CSRF token
# @ensure_csrf_cookie
# def get_csrf(request):
#     return JsonResponse({"message": "CSRF cookie set"})


# @method_decorator(ensure_csrf_cookie, name='dispatch')
# class DoctorLoginAPIView(APIView):
#     def post(self, request):
#         email = request.data.get('email')
#         license_number = request.data.get('license_number')

#         if not email or not license_number:
#             return Response({'detail': 'Email and license number are required.'},
#                             status=status.HTTP_400_BAD_REQUEST)

#         try:
#             doctor = Doctor.objects.get(email=email, license_number=license_number)
#         except Doctor.DoesNotExist:
#             return Response({'detail': 'Invalid email or license number.'},
#                             status=status.HTTP_400_BAD_REQUEST)

#         response_data = {
#             'doctor_id': doctor.id,
#             'name': doctor.name,
#             'email': doctor.email,
#             'specialist': doctor.specialist,
#             'qualification': doctor.qualification,
#             'college_name': doctor.college_name,
#             'experience': doctor.experience,
#             'consultation_fee': str(doctor.consultation_fee),
#             'available_time': doctor.available_time,
#             'bio': doctor.bio,
#             'photo_url': doctor.photo.url if doctor.photo else None
#         }

#         return Response(response_data, status=status.HTTP_200_OK)



#this  is my updated code (with login+updated functionality)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator
from django.http import JsonResponse
from doctor.models import Doctor


@ensure_csrf_cookie
def get_csrf(request):
    return JsonResponse({"message": "CSRF cookie set"})


@method_decorator(ensure_csrf_cookie, name='dispatch')
class DoctorLoginAPIView(APIView):
    def post(self, request):
        email = request.data.get('email')
        license_number = request.data.get('license_number')

        if not email or not license_number:
            return Response({'detail': 'Email and license number are required.'},
                            status=status.HTTP_400_BAD_REQUEST)

        try:
            doctor = Doctor.objects.get(email=email, license_number=license_number)
        except Doctor.DoesNotExist:
            return Response({'detail': 'Invalid email or license number.'},
                            status=status.HTTP_400_BAD_REQUEST)

        response_data = {
            'doctor_id': doctor.id,
            'name': doctor.name,
            'email': doctor.email,
            'specialist': doctor.specialist,
            'qualification': doctor.qualification,
            'college_name': doctor.college_name,
            'experience': doctor.experience,
            'consultation_fee': str(doctor.consultation_fee),
            'available_time': doctor.available_time,
            'bio': doctor.bio,
            'photo_url': doctor.photo.url if doctor.photo else None
        }

        return Response(response_data, status=status.HTTP_200_OK)


class DoctorUpdateAPIView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def put(self, request, doctor_id):
        try:
            doctor = Doctor.objects.get(id=doctor_id)
        except Doctor.DoesNotExist:
            return Response({'detail': 'Doctor not found'}, status=status.HTTP_404_NOT_FOUND)

        doctor.name = request.data.get('name', doctor.name)
        doctor.specialist = request.data.get('specialist', doctor.specialist)
        doctor.qualification = request.data.get('qualification', doctor.qualification)
        doctor.college_name = request.data.get('college_name', doctor.college_name)
        doctor.experience = request.data.get('experience', doctor.experience)
        doctor.consultation_fee = request.data.get('consultation_fee', doctor.consultation_fee)
        doctor.available_time = request.data.get('available_time', doctor.available_time)
        doctor.bio = request.data.get('bio', doctor.bio)

        if request.FILES.get('photo'):
            doctor.photo = request.FILES['photo']

        doctor.save()
        return Response({'message': 'Profile updated successfully.'}, status=status.HTTP_200_OK)
