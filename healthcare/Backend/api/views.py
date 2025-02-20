from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from django.shortcuts import get_object_or_404
from .models import Product,Cart, Prescription
from .serializers import ProductSerializer
from .serializers import CartSerializer
from .models import Service, Category, Doctor,Order
from .serializers import ServiceSerializer, CategorySerializer, DoctorSerializer,OrderSerializer
from .serializers import PrescriptionSerializer


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



# Service APIs
@api_view(['GET'])
def get_services(request):
    """Retrieve all services."""
    services = Service.objects.all()
    serializer = ServiceSerializer(services, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_service(request):
    """Create a new service."""
    serializer = ServiceSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_service(request, pk):
    """Delete a service."""
    service = get_object_or_404(Service, pk=pk)
    service.delete()
    return Response({"message": "Service deleted successfully!"}, status=status.HTTP_204_NO_CONTENT)

# Category APIs
@api_view(['GET'])
def get_categories(request, service_id=None):
    """Retrieve categories for a specific service or all categories."""
    if service_id:
        categories = Category.objects.filter(service_id=service_id)
    else:
        categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_category(request):
    """Create a new category."""
    serializer = CategorySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_category(request, pk):
    """Delete a category."""
    category = get_object_or_404(Category, pk=pk)
    category.delete()
    return Response({"message": "Category deleted successfully!"}, status=status.HTTP_204_NO_CONTENT)

# Doctor APIs
@api_view(['GET'])
def get_doctors(request, category_id=None):
    """Retrieve doctors for a specific category or all doctors."""
    if category_id:
        doctors = Doctor.objects.filter(category_id=category_id)
    else:
        doctors = Doctor.objects.all()
    serializer = DoctorSerializer(doctors, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_doctor(request):
    """Create a new doctor."""
    serializer = DoctorSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_doctor(request, pk):
    """Delete a doctor."""
    doctor = get_object_or_404(Doctor, pk=pk)
    doctor.delete()
    return Response({"message": "Doctor deleted successfully!"}, status=status.HTTP_204_NO_CONTENT)


@api_view(['PUT'])
def edit_service(request, pk):
    """Edit an existing service."""
    service = get_object_or_404(Service, pk=pk)
    data = request.data.copy()

    # If no image is provided, retain the current image
    if 'image' not in request.FILES:
        data['image'] = service.image

    serializer = ServiceSerializer(service, data=data, partial=True)  # Allow partial updates
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def edit_category(request, pk):
    """Edit an existing category."""
    category = get_object_or_404(Category, pk=pk)
    data = request.data.copy()

    if 'image' not in request.FILES:
        data['image'] = category.image

    serializer = CategorySerializer(category, data=data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
def place_order(request):
    if request.user.is_authenticated:
        try:
            data = request.data
            # Validate required fields
            required_fields = ['full_name', 'address', 'phone_number', 'email', 'total_price']
            for field in required_fields:
                if field not in data:
                    return Response(
                        {"error": f"{field} is required"}, 
                        status=status.HTTP_400_BAD_REQUEST
                    )

            # Create the order
            order = Order.objects.create(
                user=request.user,
                full_name=data['full_name'],
                address=data['address'],
                phone_number=data['phone_number'],
                email=data['email'],
                total_price=data['total_price']
            )

            # Clear the user's cart after order creation
            Cart.objects.filter(user=request.user).delete()

            # Return the order details
            serializer = OrderSerializer(order)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response(
                {"error": str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    return Response(
        {"error": "User not authenticated."}, 
        status=status.HTTP_401_UNAUTHORIZED
    )
    
@api_view(['POST'])
def upload_prescription(request):
    parser_classes = (MultiPartParser, FormParser)
    serializer = PrescriptionSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Prescription uploaded successfully!', 'data': serializer.data}, status=201)
    return Response(serializer.errors, status=400)

@api_view(['GET'])
def get_prescriptions(request):
    prescriptions = Prescription.objects.all()
    serializer = PrescriptionSerializer(prescriptions, many=True)
    return Response(serializer.data)