from . import views
from django.urls import path

# 'login' prefix for urls
urlpatterns = [
    path('', views.login, name='login'),
    path('signup/', views.signup, name='signup'),
    path('mypage/', views.user_page, name='user_page')
]