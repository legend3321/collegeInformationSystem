# Generated by Django 5.0.6 on 2024-05-26 17:39

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('college', '0010_remove_attendence_timetable_attendence_subject'),
    ]

    operations = [
        migrations.AlterField(
            model_name='attendence',
            name='date',
            field=models.DateField(default=datetime.date.today),
        ),
    ]
