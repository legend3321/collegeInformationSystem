from django.urls import path

from . import views

urlpatterns = [
    path('csrf_token/', views.csrf_token, name='csrf_token'),
    path('login/', views.login, name='login'),
    path('register/', views.register, name='register'),
]