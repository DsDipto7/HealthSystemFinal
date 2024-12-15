from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status 
from .models import Product
from .serializers import ProductSerializer

# Create your views here.
@api_view(['GET'])
def get_products(request):
  products=  Product.objects.all()
  serializedData= ProductSerializer(products,many=True).data 
  return Response(serializedData)

@api_view(['POST'])
def create_products(request):
    data = request.data
    serializer=ProductSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



