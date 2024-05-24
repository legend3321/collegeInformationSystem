from django.db import models
from Auth.models import Course, Section, Teacher
# Create your models here.

class TimeTable(models.Model):
    dayOfWeek = models.CharField(max_length=10)
    start_time = models.TimeField()
    end_time = models.TimeField()
    subject = models.ForeignKey(Course, on_delete=models.CASCADE)
    section = models.ForeignKey(Section, on_delete=models.CASCADE)
    room = models.CharField(max_length=10)
    description = models.TextField()


class ExtraClass(models.Model):
    day = models.DateField(max_length=10)
    start_time = models.TimeField()
    end_time = models.TimeField()
    subject = models.ForeignKey(Course, on_delete=models.CASCADE)
    section = models.ForeignKey(Section, on_delete=models.CASCADE)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    room = models.CharField(max_length=10)
    description = models.TextField()
    