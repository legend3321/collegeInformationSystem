from django.urls import path

from . import views

urlpatterns = [
    path('login/', views.login_view, name='login'),
    path('user/', views.UserAPIView.as_view(), name='user'),
    path('student/', views.StudentAPIView.as_view(), name='student'),
    path('student/<int:pk>/', views.get_student, name='student'),
    path('teacher/', views.TeacherAPIView.as_view(), name='teacher'),
    path('teacher/<int:pk>/', views.get_teacher, name='teacher'),
    path('teacher/section/<int:pk>',views.get_section_teacher, name="teacher_section" ),
    path('teacher/department/section/<int:pk>',views.get_teacher_department_section, name="teacher_department_section"),
    path('department/', views.DepartmentAPIView.as_view(), name='department'),
    path('department/section/<int:pk>/', views.get_department_section, name='section'),
    path('section/', views.SectionAPIView.as_view(), name='section'),
    path('course/', views.CourseAPIView.as_view(), name='course'),
    path('course/<int:pk>/', views.get_course, name='course'),
]