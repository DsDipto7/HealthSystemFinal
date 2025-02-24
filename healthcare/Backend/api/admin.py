from django.contrib import admin

# Register your models here.
from .models import Product
from .models import Cart,Service,Category,Doctor,Prescription
from .models import Order

# Register your models here.

admin.site.register(Product)
admin.site.register(Cart)
admin.site.register(Service)
admin.site.register(Category)
admin.site.register(Doctor)
admin.site.register(Order)
admin.site.register(Prescription)
