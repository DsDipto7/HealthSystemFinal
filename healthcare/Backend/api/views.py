# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from rest_framework import status 
# from .models import Product
# from .serializers import ProductSerializer

# # Create your views here.
# @api_view(['GET'])
# def get_products(request):
#   products=  Product.objects.all()
#   serializedData= ProductSerializer(products,many=True).data 
#   return Response(serializedData)

# @api_view(['POST'])
# def create_products(request):
#     data = request.data
#     serializer=ProductSerializer(data=data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Product
from .serializers import ProductSerializer

@api_view(['GET'])
def get_products(request):
    products = Product.objects.all()
    serializedData = ProductSerializer(products, many=True).data
    return Response(serializedData)

@api_view(['POST'])
def create_products(request):
    data = request.data
    serializer = ProductSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def edit_product(request, pk):
    product = get_object_or_404(Product, pk=pk)
    data = request.data.copy()

    # If no image is provided, retain the current image
    if 'productImage' not in request.FILES:
        data['productImage'] = product.productImage

    serializer = ProductSerializer(product, data=data, partial=True)  # Allow partial updates
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def delete_product(request, pk):
    product = get_object_or_404(Product, pk=pk)
    product.delete()
    return Response({'message': 'Product deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
