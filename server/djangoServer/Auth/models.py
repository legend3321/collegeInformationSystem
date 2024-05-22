from django.db import models

# Create your models here.

class Student(models.Model):
    fname = models.CharField(max_length=100)
    mname = models.CharField(max_length=100)
    lname = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    section = models.CharField(max_length=10)
    roll = models.IntegerField()
    year = models.IntegerField()
    semester = models.IntegerField()
    phone = models.CharField(max_length=15)
    studentId = models.CharField(max_length=10)

    def __str__(self):
        return self.studentId
    