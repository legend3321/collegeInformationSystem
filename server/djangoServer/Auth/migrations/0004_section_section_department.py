# Generated by Django 5.0.6 on 2024-05-23 16:50

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Auth', '0003_remove_section_section_course_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='section',
            name='section_department',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='Auth.department'),
            preserve_default=False,
        ),
    ]