from rest_framework import serializers # type: ignore
from .models import TimeTable, ExtraClass

class TimeTableSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = TimeTable
        fields = '__all__'


class ExtraClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExtraClass
        fields = '__all__'
