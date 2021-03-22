from . import views
from django.urls import path


urlpatterns = [
    path('', views.home, name='dashboard'),
    path(r'customer<str:pk>', views.customer, name='customer'),
    path(r'inventory/', views.inventory)
]