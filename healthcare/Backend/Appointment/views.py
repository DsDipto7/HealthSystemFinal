# from django.shortcuts import render

# # Create your views here.
# from django.shortcuts import render

# # Create your views here.
# # appointments/views.py
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from rest_framework import status
# from Appointment.models import Appointment
# from doctor.models import Doctor
# from .serializers import AppointmentSerializer
# from django.shortcuts import get_object_or_404


# # @api_view(['POST'])
# # @permission_classes([IsAuthenticated])
# # def create_appointment(request):
# #     doctor_email = request.data.get('doctor_email')
# #     doctor = get_object_or_404(Doctor, email=doctor_email)

# #     room_name = f"doctor_{doctor.id}_patient_{request.user.id}"

# #     # Prepare full validated data
# #     appointment_data = {
# #         'doctor': doctor.id,
# #         'reason': request.data.get('reason'),
# #         'date': request.data.get('date'),
# #         'time': request.data.get('time'),
# #         'room': room_name,
# #         'status': 'pending',
# #         'user': request.user.id,
# #     }

# #     serializer = AppointmentSerializer(data=appointment_data, context={'request': request})
# #     if serializer.is_valid():
# #         appointment = Appointment.objects.create(
# #             user=request.user,
# #             doctor=doctor,
# #             reason=serializer.validated_data['reason'],
# #             date=serializer.validated_data['date'],
# #             time=serializer.validated_data['time'],
# #             room=room_name,
# #             status='pending',
# #         )
# #         return Response(AppointmentSerializer(appointment).data, status=status.HTTP_201_CREATED)
# #     else:
# #         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def create_appointment(request):
#     doctor_email = request.data.get('doctor_email')
#     doctor = get_object_or_404(Doctor, email=doctor_email)

#     room_name = f"doctor_{doctor.id}_patient_{request.user.id}"

#     # Prepare validated data
#     appointment_data = {
#         "doctor": doctor.id,
#         "reason": request.data.get("reason"),
#         "date": request.data.get("date"),
#         "time": request.data.get("time"),
#         "room": room_name,
#         "status": "pending",
#     }

#     serializer = AppointmentSerializer(data=appointment_data, context={"request": request})

#     if serializer.is_valid():
#         serializer.save(user=request.user, doctor=doctor, room=room_name)

#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     else:
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)





# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def user_appointments(request):
#     appointments = Appointment.objects.filter(user=request.user)
#     print([a.room for a in appointments])  # Debug
#     serializer = AppointmentSerializer(appointments, many=True)
#     return Response(serializer.data)


# @api_view(['GET'])
# def doctor_appointments(request, doctor_id):
#     appointments = Appointment.objects.filter(doctor__id=doctor_id)
#     serializer = AppointmentSerializer(appointments, many=True)
#     return Response(serializer.data)

# @api_view(['POST'])
# def update_appointment_status(request, appointment_id):
#     status_value = request.data.get('status')  # "accepted" or "declined"
#     appointment = get_object_or_404(Appointment, id=appointment_id)

#     if status_value not in ['accepted', 'declined']:
#         return Response({'detail': 'Invalid status.'}, status=status.HTTP_400_BAD_REQUEST)

#     appointment.status = status_value
#     appointment.save()

#     return Response({'message': f'Appointment {status_value}.'}, status=status.HTTP_200_OK)

# @api_view(['DELETE'])
# @permission_classes([IsAuthenticated])
# def delete_appointment(request, appointment_id):
#     appointment = get_object_or_404(Appointment, id=appointment_id)

#     # Allow deletion only if the user is the patient or doctor
#     if request.user != appointment.user and request.user.email != appointment.doctor.email:
#         return Response({'detail': 'Not authorized to delete this appointment.'}, status=status.HTTP_403_FORBIDDEN)

#     appointment.delete()
#     return Response({'message': 'Appointment deleted.'}, status=status.HTTP_204_NO_CONTENT)

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def mark_call_started(request, appointment_id):
#     appointment = get_object_or_404(Appointment, id=appointment_id)

#     # Only the doctor should be able to start the call
#     if request.user.email != appointment.doctor.email:
#         return Response({'detail': 'Not authorized.'}, status=status.HTTP_403_FORBIDDEN)

#     appointment.is_call_started = True
#     appointment.save()

#     return Response({'message': 'Call marked as started.'}, status=status.HTTP_200_OK)
# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def mark_call_ended(request, appointment_id):
#     appointment = get_object_or_404(Appointment, id=appointment_id)

#     # Allow either doctor or patient to mark call as ended
#     if request.user != appointment.user and request.user.email != appointment.doctor.email:
#         return Response({'detail': 'Not authorized.'}, status=status.HTTP_403_FORBIDDEN)

#     appointment.is_call_ended = True
#     appointment.save()

#     return Response({'message': 'Call marked as ended.'}, status=status.HTTP_200_OK)

from django.shortcuts import render

# Create your views here.
# appointments/views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Appointment
from doctor.models import Doctor
from .serializers import AppointmentSerializer
from django.shortcuts import get_object_or_404


# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def create_appointment(request):
#     doctor_email = request.data.get('doctor_email')
#     doctor = get_object_or_404(Doctor, email=doctor_email)

#     room_name = f"doctor_{doctor.id}_patient_{request.user.id}"

#     # Prepare full validated data
#     appointment_data = {
#         'doctor': doctor.id,
#         'reason': request.data.get('reason'),
#         'date': request.data.get('date'),
#         'time': request.data.get('time'),
#         'room': room_name,
#         'status': 'pending',
#         'user': request.user.id,
#     }

#     serializer = AppointmentSerializer(data=appointment_data, context={'request': request})
#     if serializer.is_valid():
#         appointment = Appointment.objects.create(
#             user=request.user,
#             doctor=doctor,
#             reason=serializer.validated_data['reason'],
#             date=serializer.validated_data['date'],
#             time=serializer.validated_data['time'],
#             room=room_name,
#             status='pending',
#         )
#         return Response(AppointmentSerializer(appointment).data, status=status.HTTP_201_CREATED)
#     else:
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_appointment(request):
    doctor_email = request.data.get('doctor_email')
    doctor = get_object_or_404(Doctor, email=doctor_email)

    room_name = f"doctor_{doctor.id}_patient_{request.user.id}"

    # Prepare validated data
    appointment_data = {
        "doctor": doctor.id,
        "reason": request.data.get("reason"),
        "date": request.data.get("date"),
        "time": request.data.get("time"),
        "room": room_name,
        "status": "pending",
    }

    serializer = AppointmentSerializer(data=appointment_data, context={"request": request})

    if serializer.is_valid():
        serializer.save(user=request.user, doctor=doctor, room=room_name)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)





@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_appointments(request):
    appointments = Appointment.objects.filter(user=request.user)
    print([a.room for a in appointments])  # Debug
    serializer = AppointmentSerializer(appointments, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def doctor_appointments(request, doctor_id):
    appointments = Appointment.objects.filter(doctor__id=doctor_id)
    serializer = AppointmentSerializer(appointments, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def update_appointment_status(request, appointment_id):
    status_value = request.data.get('status')  # "accepted" or "declined"
    appointment = get_object_or_404(Appointment, id=appointment_id)

    if status_value not in ['accepted', 'declined']:
        return Response({'detail': 'Invalid status.'}, status=status.HTTP_400_BAD_REQUEST)

    appointment.status = status_value
    appointment.save()

    return Response({'message': f'Appointment {status_value}.'}, status=status.HTTP_200_OK)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_appointment(request, appointment_id):
    appointment = get_object_or_404(Appointment, id=appointment_id)

    # Allow deletion only if the user is the patient or doctor
    if request.user != appointment.user and request.user.email != appointment.doctor.email:
        return Response({'detail': 'Not authorized to delete this appointment.'}, status=status.HTTP_403_FORBIDDEN)

    appointment.delete()
    return Response({'message': 'Appointment deleted.'}, status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def mark_call_started(request, appointment_id):
    appointment = get_object_or_404(Appointment, id=appointment_id)

    # Only the doctor should be able to start the call
    if request.user.email != appointment.doctor.email:
        return Response({'detail': 'Not authorized.'}, status=status.HTTP_403_FORBIDDEN)

    appointment.is_call_started = True
    appointment.save()

    return Response({'message': 'Call marked as started.'}, status=status.HTTP_200_OK)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def mark_call_ended(request, appointment_id):
    appointment = get_object_or_404(Appointment, id=appointment_id)

    # Allow either doctor or patient to mark call as ended
    if request.user != appointment.user and request.user.email != appointment.doctor.email:
        return Response({'detail': 'Not authorized.'}, status=status.HTTP_403_FORBIDDEN)

    appointment.is_call_ended = True
    appointment.save()

    return Response({'message': 'Call marked as ended.'}, status=status.HTTP_200_OK)