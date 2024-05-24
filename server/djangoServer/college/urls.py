from django.urls import path
from . import views

urlpatterns = [
    path('timetable/', views.TimeTableView.as_view(), name='timetable'),
    path('extraclass/', views.ExtraClassView.as_view(), name='extraclass'),
]