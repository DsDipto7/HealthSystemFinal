from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Ambulance
from .serializers import AmbulanceSerializer

@api_view(['GET'])
def get_ambulances(request):
    ambulances = Ambulance.objects.all()
    serialized_data = AmbulanceSerializer(ambulances, many=True).data
    return Response(serialized_data)

@api_view(['POST'])
def create_ambulance(request):
    data = request.data
    serializer = AmbulanceSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_ambulance_by_id(request, pk):
    ambulance = get_object_or_404(Ambulance, pk=pk)
    serialized_data = AmbulanceSerializer(ambulance).data
    return Response(serialized_data)

@api_view(['PUT'])
def update_ambulance(request, pk):
    ambulance = get_object_or_404(Ambulance, pk=pk)
    serializer = AmbulanceSerializer(ambulance, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_ambulance(request, pk):
    ambulance = get_object_or_404(Ambulance, pk=pk)
    ambulance.delete()
    return Response({'message': 'Ambulance deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)

