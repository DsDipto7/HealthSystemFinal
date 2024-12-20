# from django.urls import path
# from .views import get_products, create_products

# urlpatterns =[
#     path('products/',get_products,name='get_products'),
#     path('products/create/',create_products,name='create_products'),
    
# ]
from django.urls import path
from .views import get_products, create_products, edit_product, delete_product

urlpatterns = [
    path('products/', get_products, name='get_products'),
    path('products/create/', create_products, name='create_products'),
     path('products/<int:pk>/edit/', edit_product, name='edit_product'),
    path('products/<int:pk>/delete/', delete_product, name='delete_product'),
]
