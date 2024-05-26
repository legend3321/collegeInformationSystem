from django.urls import path
from . import views

urlpatterns = [
    path('timetable/', views.TimeTableView.as_view(), name='timetable'),
    path('extraclass/', views.ExtraClassView.as_view(), name='extraclass'),
    path('schedule/', views.get_schedule, name='schedule'),
    path('section/extraclass/', views.get_extraclass, name='extra_class'),
    path('teacher/extraclass/', views.get_extraclass_teacher, name='extra_class_teacher'),
]