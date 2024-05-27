from django.db import models

from django.conf import settings
# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=255)

    class Meta:
        ordering = ('name',)
        verbose_name_plural = 'Categories'

    def __str__(self):
        return self.name

    
class Location(models.Model):
    name = models.CharField(max_length=255)
    category = models.ForeignKey(Category, default='Lecture Building', related_name='locations', on_delete=models.CASCADE)
    latitude = models.FloatField()
    longitude = models.FloatField()

    class Meta:
        ordering = ('name',)
        verbose_name_plural = 'Locations'

    def __str__(self):
        return self.name
  
