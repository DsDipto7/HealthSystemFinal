from rest_framework import serializers
from .models import Product, Cart, Service, Category, Doctor,Order, Prescription

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class CartSerializer(serializers.ModelSerializer):
    productName = serializers.ReadOnlyField(source='product.productName')  # Get product name
    productPrice = serializers.ReadOnlyField(source='product.productPrice')  # Get product price
    total_price = serializers.SerializerMethodField()  # Compute total price dynamically

    class Meta:
        model = Cart
        fields = ['id', 'user', 'product', 'productName', 'productPrice', 'quantity', 'total_price']
        read_only_fields = ['user', 'total_price', 'productName', 'productPrice']

    def get_total_price(self, obj):
        # Compute total price as product price * quantity
        return round(obj.product.productPrice * obj.quantity, 2)

        

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    service_name = serializers.CharField(source='service.name', read_only=True)  # Add a service_name field

    class Meta:
        model = Category
        fields = ['id', 'description', 'service', 'service_name', 'image']  # Include 'service_name' in the output

    def get_service_detail(self, obj):
        return {
            "id": obj.service.id,
            "name": obj.service.name
        }

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = '__all__'       
       
        
        
        
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'user', 'full_name', 'address', 'phone_number', 'email', 'total_price', 'created_at', 'status']        
        
        

class PrescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prescription
        fields = '__all__'
