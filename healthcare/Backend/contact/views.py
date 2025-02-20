from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Contact
from .serializers import ContactSerializer

@api_view(['POST'])
def contact_create(request):
    if request.method == 'POST':
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Contact data saved successfully!"}, status=201)
        return Response(serializer.errors, status=400)

@api_view(['GET'])
def contact_list(request):
    if request.method == 'GET':
        contacts = Contact.objects.all()
        serializer = ContactSerializer(contacts, many=True)
        return Response(serializer.data, status=200)
