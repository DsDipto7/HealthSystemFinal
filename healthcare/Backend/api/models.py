from django.db import models

# Create your models here.
class Product(models.Model):
    productId = models.IntegerField()
    productName = models.CharField(max_length=100)
    productDescription = models.TextField()  # Changed to TextField for longer descriptions
    productPrice = models.DecimalField(max_digits=10, decimal_places=2)  # Changed to DecimalField for better handling of prices
    productImage = models.ImageField(upload_to='media/')  # Specify upload directory

    def __str__(self):
        return self.productName  # Corrected to return the product name for better readability in admin
