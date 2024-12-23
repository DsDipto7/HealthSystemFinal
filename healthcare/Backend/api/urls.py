# from django.urls import path
# from .views import get_products, create_products

# urlpatterns =[
#     path('products/',get_products,name='get_products'),
#     path('products/create/',create_products,name='create_products'),
    
# ]
# from django.urls import path
# from .views import get_products, create_products, edit_product, delete_product

# urlpatterns = [
#     path('products/', get_products, name='get_products'),
#     path('products/create/', create_products, name='create_products'),
#      path('products/<int:pk>/edit/', edit_product, name='edit_product'),
#     path('products/<int:pk>/delete/', delete_product, name='delete_product'),
# ]
from django.urls import path
from .views import (
    get_products,
    create_products,
    edit_product,
    delete_product,
    add_to_cart,
    view_cart,
    update_cart_quantity,
    remove_from_cart,
)

urlpatterns = [
    # Product endpoints
    path('products/', get_products, name='get_products'),
    path('products/create/', create_products, name='create_products'),
    path('products/<int:pk>/edit/', edit_product, name='edit_product'),
    path('products/<int:pk>/delete/', delete_product, name='delete_product'),
    
    # Cart endpoints
    path('cart/add/', add_to_cart, name='add_to_cart'),
    path('cart/view/', view_cart, name='view_cart'),
    path('cart/<int:cart_id>/update/', update_cart_quantity, name='update_cart_quantity'),
    path('cart/<int:cart_id>/remove/', remove_from_cart, name='remove_from_cart'),
]
