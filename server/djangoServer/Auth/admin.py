from django.contrib import admin
from .models import Student, Teacher, Department, Section, Course


# Register your models here.

admin.site.register(Student)    # Register the Student model with the admin site
admin.site.register(Teacher)    # Register the Teacher model with the admin site
admin.site.register(Department)    # Register the Department model with the admin site
admin.site.register(Section)    # Register the Section model with the admin site
admin.site.register(Course)    # Register the Course model with the admin site
