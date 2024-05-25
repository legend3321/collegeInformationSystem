from rest_framework import serializers # type: ignore
from .models import TimeTable, ExtraClass
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
