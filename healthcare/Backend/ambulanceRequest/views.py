from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import AmbulanceRequest
from .serializers import AmbulanceRequestSerializer

@api_view(['POST'])
def create_ambulance_request(request):
    serializer = AmbulanceRequestSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Ambulance request submitted successfully!"}, status=201)
    return Response(serializer.errors, status=400)

@api_view(['GET'])
def list_ambulance_requests(request):
    requests = AmbulanceRequest.objects.all()
    serializer = AmbulanceRequestSerializer(requests, many=True)
    return Response(serializer.data)
