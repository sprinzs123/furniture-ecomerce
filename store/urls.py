from . import views
from django.urls import path

urlpatterns = [
    path('', views.front, name='front'),
    path(r'store/item<int:product_id>', views.single, name='single'),
    path(r'store/', views.StorePage.as_view(), name='store')
]