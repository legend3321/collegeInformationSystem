from django.shortcuts import render


from rest_framework.views import APIView # type: ignore
from rest_framework.response import Response  # type: ignore
from .models import TimeTable, ExtraClass
from .serializers import TimeTableSerializer, ExtraClassSerializer

# Create your views here.

class TimeTableView(APIView):
    def get(self, request):
        timetable = TimeTable.objects.all()
        serializer = TimeTableSerializer(timetable, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = TimeTableSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
    def put(self, request, pk):
        timetable = TimeTable.objects.get(id=pk)
        serializer = TimeTableSerializer(instance=timetable, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    
    def delete(self, request, pk):
        timetable = TimeTable.objects.get(id=pk)
        timetable.delete()
        return Response('TimeTable deleted successfully')
    

class ExtraClassView(APIView):
    def get(self, request):
        extraclass = ExtraClass.objects.all()
        serializer = ExtraClassSerializer(extraclass, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = ExtraClassSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
    def put(self, request, pk):
        extraclass = ExtraClass.objects.get(id=pk)
        serializer = ExtraClassSerializer(instance=extraclass, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    
    def delete(self, request, pk):
        extraclass = ExtraClass.objects.get(id=pk)
        extraclass.delete()
        return Response('ExtraClass deleted successfully')

