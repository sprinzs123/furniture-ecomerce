from . import views
from django.urls import path

urlpatterns = [
    path('', views.front, name='front'),
    path(r'single/', views.single, name='single'),
    path(r'store/', views.store, name='store'),
]