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

