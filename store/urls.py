from . import views
from django.urls import path

urlpatterns = [
    path('', views.front, name='front'),
    path(r'single/', views.store, name='single'),
    path(r'store/', views.single, name='store'),
]