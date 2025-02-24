from django.db import models 
from django.db import models
from django.contrib.auth.models import User  # Import the User model from Django's built-in authentication system
from decimal import Decimal
from django.conf import settings

# Create your models here.
class Product(models.Model):
    productId = models.IntegerField()
    productName = models.CharField(max_length=100)
    productDescription = models.TextField()  # Changed to TextField for longer descriptions
    productPrice = models.DecimalField(max_digits=10, decimal_places=2)  # Changed to DecimalField for better handling of prices
    productImage = models.ImageField(upload_to='media/')  # Specify upload directory

    def __str__(self):
        return self.productName  # Corrected to return the product name for better readability in admin



class Cart(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)  # Link the cart to the custom user
    product = models.ForeignKey('Product', on_delete=models.CASCADE)  # Link to a product in the Product model
    quantity = models.PositiveIntegerField(default=1)  # Quantity of the product in the cart

    def total_price(self):
        return self.quantity * self.product.productPrice  # Calculate total price for this product

    def __str__(self):
        return f"{self.user.username} - {self.product.productName} ({self.quantity})"


class Service(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='media/')

    def __str__(self):
        return self.name


class Category(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name='categories')
    description = models.TextField()
    image = models.ImageField(upload_to='media/')

    def __str__(self):
        return f"Category for {self.service.name}"


class Doctor(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='doctors')
    name = models.CharField(max_length=100)
    specialization = models.CharField(max_length=100)
    image = models.ImageField(upload_to='media/')
    bio = models.TextField()

    def __str__(self):
        return self.name


class Order(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=255)
    address = models.TextField()
    phone_number = models.CharField(max_length=15)
    email = models.EmailField()
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50, default='Pending')  # Pending, Completed, Cancelled
    payment_status = models.CharField(max_length=50, default='Unpaid')  # Add this field

    def __str__(self):
        return f"Order {self.id} - {self.user.username}"

    def calculate_total(self):
        cart_items = Cart.objects.filter(user=self.user)
        total = sum(item.total_price() for item in cart_items)
        self.total_price = total
        self.save()

class Prescription(models.Model):
    full_name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=15)
    email = models.EmailField()
    prescription_image = models.ImageField(upload_to='media/')  # Image upload path

    def __str__(self):
        return f"{self.full_name} - {self.phone_number}"