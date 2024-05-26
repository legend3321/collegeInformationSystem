from django.shortcuts import render


from rest_framework.views import APIView # type: ignore
from rest_framework.response import Response  # type: ignore
from .models import TimeTable, ExtraClass, Course, Teacher
from .serializers import TimeTableSerializer, ExtraClassSerializer
from rest_framework.decorators import api_view # type: ignore
from django.contrib.auth.models import User
from college.models import ExtraClass

# Create your views here.

@api_view(['POST'])
def get_schedule(request):
    userid = request.data['userid']
    day = request.data['day']
    user = User.objects.get(id=userid)
    schedule = TimeTable.objects.filter(section=user.student.section, day=day)
    if schedule == None:
        return Response('No schedule found for the given section and day', status=204)
    serializer = TimeTableSerializer(schedule, many=True)
    if serializer.data == []:
        return Response('No schedule found for the given section and day', status=204)
    return Response(serializer.data)

class TimeTableView(APIView):
    def get(self, request):
        sections = list(TimeTable.objects.values("section").distinct())
        timetables = []
        for section in sections: 
            timetables.append({"section" : section, "schedule" : TimeTable.objects.filter(section=section['section'])})

        serializer = []
        for timetable in timetables:
            serializer.append({"section" : timetable['section'], "schedule" : TimeTableSerializer(timetable['schedule'], many=True).data})
        return Response(serializer)
    
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


@api_view(['POST'])
def get_extraclass(request):
    userid = request.data['userid']
    day = request.data['day']
    user = User.objects.get(id=userid)
    extraclass = ExtraClass.objects.filter(section=user.student.section, day=day)
    if extraclass == None:
        return Response('No extra class found for the given section and day', status=204)
    serializer = ExtraClassSerializer(extraclass, many=True)
    if serializer.data == []:
        return Response('No extra class found for the given section and day', status=204)
    return Response(serializer.data)

@api_view(['POST'])
def get_extraclass_teacher(request):
    userid = request.data['userid']
    user = User.objects.get(id=userid)
    if user.teacher == None:
        return Response('No teacher found for the given user', status=204)
    extraclass = ExtraClass.objects.filter(teacher=user.teacher)
    if extraclass == None:
        return Response('No extra class found for the given teacher and day', status=204)
    serializer = ExtraClassSerializer(extraclass, many=True)
    if serializer.data == []:
        return Response('No extra class found for the given teacher and day', status=204)
    return Response(serializer.data)

class ExtraClassView(APIView):
    def get(self, request):
        extraclass = ExtraClass.objects.all()
        serializer = ExtraClassSerializer(extraclass, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        room = request.data['room']
        start_time = request.data['start_time']
        end_time = request.data['end_time']
        day = request.data['day']
        dayName = request.data['dayName']
        section= request.data['section']
        

        # Check if there is already an entry in TimeTable
        timetable_entry = TimeTable.objects.filter(room=room, day=dayName, section=section).exclude(start_time__gte=end_time, end_time__lte=start_time).first()
        
        # Check if there is already an entry in ExtraClass
        extraclass_entry = ExtraClass.objects.filter(room=room, day=day, section=section).exclude(start_time__gte=end_time, end_time__lte=start_time).first()

        
        if timetable_entry or extraclass_entry:
            return Response('An entry already exists for the given room, start time, and day', status=204)
        
        subject_id = request.data['subject']
        teacher_id = request.data['teacher']
        serializer = ExtraClassSerializer(data=request.data)
        if serializer.is_valid():
            subject = Course.objects.get(course_id = subject_id)
            teacher = Teacher.objects.get(teacher_id= teacher_id)
            serializer.save(subject=subject, teacher=teacher)
            return Response(serializer.data, status=201)
        print(serializer.errors)
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

