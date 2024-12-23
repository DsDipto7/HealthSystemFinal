from django.contrib import admin

# Register your models here.
from .models import Product
from .models import Cart

# Register your models here.

admin.site.register(Product)
admin.site.register(Cart)