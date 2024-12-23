
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Product,Cart
from .serializers import ProductSerializer
from .serializers import CartSerializer

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


## For Add To Cart





@api_view(['POST'])
def add_to_cart(request):
    if request.user.is_authenticated:
        product_id = request.data.get('productId')
        quantity = int(request.data.get('quantity', 1))

        try:
            product = Product.objects.get(productId=product_id)
        except Product.DoesNotExist:
            return Response({"error": "Product not found."}, status=status.HTTP_404_NOT_FOUND)

        cart_item, created = Cart.objects.get_or_create(user=request.user, product=product)

        if not created:
            cart_item.quantity += quantity
        else:
            cart_item.quantity = quantity
        cart_item.save()

        serializer = CartSerializer(cart_item)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response({"error": "User not authenticated."}, status=status.HTTP_401_UNAUTHORIZED)



@api_view(['GET'])
def view_cart(request):
    """View the current user's cart"""
    if request.user.is_authenticated:
        cart_items = Cart.objects.filter(user=request.user)
        serializer = CartSerializer(cart_items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response({"error": "User not authenticated."}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['PUT'])
def update_cart_quantity(request, cart_id):
    """Update the quantity of a product in the cart"""
    if request.user.is_authenticated:
        cart_item = get_object_or_404(Cart, id=cart_id, user=request.user)
        new_quantity = int(request.data.get('quantity', 0))

        if new_quantity <= 0:
            return Response({"error": "Quantity must be greater than 0."}, status=status.HTTP_400_BAD_REQUEST)

        cart_item.quantity = new_quantity
        cart_item.save()

        serializer = CartSerializer(cart_item)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response({"error": "User not authenticated."}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['DELETE'])
def remove_from_cart(request, cart_id):
    """Remove a product from the cart"""
    if request.user.is_authenticated:
        cart_item = get_object_or_404(Cart, id=cart_id, user=request.user)
        cart_item.delete()
        return Response({"message": "Product removed from cart successfully!"}, status=status.HTTP_204_NO_CONTENT)
    return Response({"error": "User not authenticated."}, status=status.HTTP_401_UNAUTHORIZED)
