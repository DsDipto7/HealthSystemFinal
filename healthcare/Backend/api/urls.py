from django.urls import path
from .views import upload_prescription, get_prescriptions
from .views import (
    get_products,
    create_products,
    edit_product,
    delete_product,
    add_to_cart,
    view_cart,
    update_cart_quantity,
    remove_from_cart,
    place_order,  
  
)
from .views import (
    get_services, create_service, delete_service,
    get_categories, create_category, delete_category,
    get_doctors, create_doctor, delete_doctor,edit_service,
    edit_category,
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
    path('services/', get_services, name='get_services'),
    path('services/create/', create_service, name='create_service'),
    path('services/<int:pk>/edit/', edit_service, name='edit_service'),
    path('services/<int:pk>/delete/', delete_service, name='delete_service'),

    # Category APIs
    path('categories/', get_categories, name='get_categories'),
    path('categories/<int:service_id>/', get_categories, name='get_service_categories'),
    path('categories/create/', create_category, name='create_category'),
    path('categories/<int:pk>/edit/', edit_category, name='edit_category'),

    path('categories/<int:pk>/delete/', delete_category, name='delete_category'),

    # Doctor APIs
    #path('doctors/', get_doctors, name='get_doctors'),
   # path('doctors/<int:category_id>/', get_doctors, name='get_category_doctors'),
    # path('doctors/create/', create_doctor, name='create_doctor'),
    # path('doctors/<int:pk>/delete/', delete_doctor, name='delete_doctor'),
    
    
    path('order/place/', place_order, name='place_order'),
     path('prescription/upload/', upload_prescription, name='upload_prescription'),
    path('prescription/list/', get_prescriptions, name='get_prescriptions'),
     
    
   
]
