from django.urls import path

from . import views

urlpatterns = [
    path('login/', views.login_view, name='login'),
    path('user/', views.UserAPIView.as_view(), name='user'),
    path('student/', views.StudentAPIView.as_view(), name='student'),
    path('student/<int:pk>/', views.get_student, name='student'),
    path('teacher/', views.TeacherAPIView.as_view(), name='teacher'),
    path('department/', views.DepartmentAPIView.as_view(), name='department'),
    path('section/', views.SectionAPIView.as_view(), name='section'),
    path('section/<int:pk>/', views.get_section, name='section'),
    path('course/', views.CourseAPIView.as_view(), name='course'),
]