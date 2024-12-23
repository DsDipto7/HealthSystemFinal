from rest_framework import serializers
from .models import Product, Cart

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

        
        
        
        
        
        
        
