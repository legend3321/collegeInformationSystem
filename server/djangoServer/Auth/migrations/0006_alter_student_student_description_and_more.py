# Generated by Django 5.0.6 on 2024-05-24 10:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Auth', '0005_alter_student_student_description_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='student',
            name='student_description',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='student',
            name='student_phone',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='teacher',
            name='teacher_description',
            field=models.CharField(max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='teacher',
            name='teacher_phone',
            field=models.CharField(max_length=50, null=True),
        ),
    ]
