from django.urls import path
from . import views

urlpatterns = [
    path('', views.map, name='index'),
    path('directions/', views.directions, name='direction'),
    path('locations/', views.get_locations, name='locations'),
    
]
