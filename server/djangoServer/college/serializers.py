from rest_framework import serializers # type: ignore
from .models import TimeTable, ExtraClass, Attendence
from Auth.serializers import CourseSerializer

class TimeTableSerializer(serializers.ModelSerializer):
    subject = CourseSerializer(read_only=True)

    class Meta:
        model = TimeTable
        fields = '__all__'




class ExtraClassSerializer(serializers.ModelSerializer):
    teacher = serializers.StringRelatedField(source='teacher.teacher_id')
    subject = CourseSerializer(read_only=True)
    
    
    class Meta:
        model = ExtraClass
        fields = '__all__'

class AttendenceSerializer(serializers.ModelSerializer):
    student = serializers.StringRelatedField(source='student.student_id')
    subject = CourseSerializer(read_only=True)
    
    class Meta:
        model = Attendence
        fields = '__all__'