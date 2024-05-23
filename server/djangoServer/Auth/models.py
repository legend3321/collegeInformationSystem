from django.db import models
from django.contrib.auth.models import User

class Department(models.Model):
    department_id = models.AutoField(primary_key=True)
    department_name = models.CharField(max_length=50)
    department_description = models.CharField(max_length=200)

class Teacher(models.Model):
    teacher_id = models.ForeignKey(User, on_delete=models.CASCADE)
    teacher_department = models.ForeignKey(Department)
    teacher_office = models.CharField(max_length=50)
    teacher_phone = models.CharField(max_length=50)
    teacher_description = models.CharField(max_length=200)

class Section(models.Model):
    section_id = models.AutoField(primary_key=True)
    section_name = models.CharField(max_length=50)
    section_number = models.IntegerField()
    section_capacity = models.IntegerField()
    section_instructor = models.CharField(max_length=50)
    section_time = models.CharField(max_length=50)
    section_days = models.CharField(max_length=50)
    section_semester = models.CharField(max_length=50)
    section_year = models.IntegerField()
    section_course = models.CharField(max_length=50)
    section_description = models.CharField(max_length=200)

class Student(models.Model):
    student_id = models.ForeignKey(User, on_delete=models.CASCADE)
    section = models.ForeignKey(Section)
    roll_number = models.IntegerField()
    student_department = models.ForeignKey(Department)
    student_semester = models.IntegerField()
    student_year = models.IntegerField()
    student_phone = models.CharField(max_length=50)
    student_description = models.CharField(max_length=200)

class Course(models.Model):
    course_id = models.AutoField(primary_key=True)
    course_name = models.CharField(max_length=50)
    course_description = models.CharField(max_length=200)
    course_department = models.ForeignKey(Department)
    course_semester = models.IntegerField()
    course_year = models.IntegerField()
    course_credit_hours = models.IntegerField()







