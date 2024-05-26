from rest_framework import serializers # type: ignore
from .models import Student, Teacher, Department, Section, Course
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ['password']


class StudentSerializer(serializers.ModelSerializer):
    student_id = UserSerializer(read_only=True)
    class Meta:
        model = Student
        fields = '__all__'


class TeacherSerializer(serializers.ModelSerializer):
    teacher_id = serializers.StringRelatedField()
    teacher_department = serializers.StringRelatedField(source="teacher_department.department_name")

    class Meta:
        model = Teacher
        fields = '__all__'


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'


class SectionSerializer(serializers.ModelSerializer):
    section_department = serializers.StringRelatedField()
    class Meta:
        model = Section
        fields = '__all__'

    def display_value(self):
        return f"{self.section_name} | {self.section_semester}"



class CourseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Course
        fields = '__all__'

    def display_value(self):
        return self.course_name

