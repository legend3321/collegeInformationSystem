from django.urls import path

from . import views

urlpatterns = [
    path('login/', views.login_view, name='login'),
    path('register/', views.register_view, name='register'),
    path('student/', views.StudentAPIView.as_view(), name='student'),
    path('teacher/', views.TeacherAPIView.as_view(), name='teacher'),
    path('department/', views.DepartmentAPIView.as_view(), name='department'),
    path('section/', views.SectionAPIView.as_view(), name='section'),
    path('course/', views.CourseAPIView.as_view(), name='course'),
]