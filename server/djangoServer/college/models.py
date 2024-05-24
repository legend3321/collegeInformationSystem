from django.db import models
from Auth.models import Course
# Create your models here.

class TimeTable(models.Model):
    day = models.CharField(max_length=10)
    start_time = models.TimeField()
    end_time = models.TimeField()
    subject = models.ForeignKey(Course, on_delete=models.CASCADE)
    room = models.CharField(max_length=10)
    
    def __str__(self):
        return f"{self.day} - {self.time} - {self.subject} - {self.room}"

class ExtraClass(models.Model):
    day = models.CharField(max_length=10)
    start_time = models.TimeField()
    end_time = models.TimeField()
    subject = models.ForeignKey(Course, on_delete=models.CASCADE)
    room = models.CharField(max_length=10)
    
    def __str__(self):
        return f"{self.day} - {self.time} - {self.subject} - {self.room}"