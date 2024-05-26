from django.urls import path
from . import views

urlpatterns = [
    path('timetable/', views.TimeTableView.as_view(), name='timetable'),
    path('extraclass/', views.ExtraClassView.as_view(), name='extraclass'),
    path('schedule/', views.get_schedule, name='schedule'),
    path('section/extraclass/', views.get_extraclass, name='extra_class'),
    path('teacher/extraclass/', views.get_extraclass_teacher, name='extra_class_teacher'),
    path('attendence/', views.AttendenceView.as_view(), name='attendance'),
    path('attendence/student/', views.get_attendence, name='attendance_student'),
]