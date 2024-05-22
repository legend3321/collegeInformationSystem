# Generated by Django 5.0.6 on 2024-05-22 15:38

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fname', models.CharField(max_length=100)),
                ('mname', models.CharField(max_length=100)),
                ('lname', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=100)),
                ('password', models.CharField(max_length=100)),
                ('section', models.CharField(max_length=10)),
                ('roll', models.IntegerField()),
                ('year', models.IntegerField()),
                ('semester', models.IntegerField()),
                ('phone', models.CharField(max_length=15)),
                ('studentId', models.CharField(max_length=10)),
            ],
        ),
    ]
