from . import views
from django.urls import path

urlpatterns = [
    path('', views.front, name='front'),
    path(r'store/item<int:product_id>', views.single, name='single'),
    path(r'store/', views.store, name='store'),
    path(r'checkout', views.checkout, name='checkout')
]