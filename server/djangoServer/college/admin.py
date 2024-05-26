from django.contrib import admin
from .models import TimeTable, ExtraClass, Attendence

# Register your models here.

admin.site.register(TimeTable)
admin.site.register(ExtraClass)
admin.site.register(Attendence)
