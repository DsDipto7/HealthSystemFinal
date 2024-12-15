from django.urls import path
from .views import get_products, create_products

urlpatterns =[
    path('products/',get_products,name='get_products'),
    path('products/create/',create_products,name='create_products'),
    # path('products/<int:pk>/', update_product, name='update_product'),
    # path('products/<int:pk>/delete/', delete_product, name='delete_product'),
]
