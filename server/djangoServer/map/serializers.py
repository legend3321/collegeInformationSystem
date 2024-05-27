from rest_framework import serializers #type: ignore
from .models import Location, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class LocationSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField(source='category.name')
    class Meta:
        model = Location
        fields = '__all__'