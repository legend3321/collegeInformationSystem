from .models import Student, Teacher, Department, Section, Course
from .serializers import StudentSerializer, TeacherSerializer, DepartmentSerializer, SectionSerializer, CourseSerializer, UserSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import login
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login
from rest_framework.views import APIView
from django.contrib.auth.models import User

# Create your views here.

@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': token.key})
    else:
        return Response({'error': 'Invalid credentials'}, status=400)
    

@api_view(['POST'])
def register_view(request):
    username = request.data['username']
    password = request.data['password']
    email = request.data['email']
    first_name = request.data['first_name']
    last_name = request.data['last_name']

    user = User.objects.get(username=username)
    if user is not None:
        return Response({'error': 'User already exists'}, status=400)
    

    user = User.objects.create_user(username=username, password=password, email=email, first_name=first_name, last_name=last_name)
    user.save()
    if user is not None:
        login(request, user)
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': token.key})
    else:
        return Response({'error': 'Invalid credentials'}, status=400)
    
class UserAPIView(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request):
        print(request.data)
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"data": serializer.data}, status=201)
        return Response({"error" : serializer.errors}, status=400)

    def put(self, request, pk):
        user = User.objects.get(id=pk)
        serializer = UserSerializer(instance=user, data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)

    def delete(self, request, pk):
        user = User.objects.get(id=pk)
        user.delete()
        return Response('User deleted successfully')

class StudentAPIView(APIView):
    def get(self, request):
        students = Student.objects.all()
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)

    def put(self, request, pk):
        student = Student.objects.get(student_id=pk)
        serializer = StudentSerializer(instance=student, data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)

    def delete(self, request, pk):
        student = Student.objects.get(student_id=pk)
        student.delete()
        return Response('Student deleted successfully')
    
class TeacherAPIView(APIView):
    def get(self, request):
        teachers = Teacher.objects.all()
        serializer = TeacherSerializer(teachers, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TeacherSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)

    def put(self, request, pk):
        teacher = Teacher.objects.get(teacher_id=pk)
        serializer = TeacherSerializer(instance=teacher, data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)

    def delete(self, request, pk):
        teacher = Teacher.objects.get(teacher_id=pk)
        teacher.delete()
        return Response('Teacher deleted successfully')
    
class DepartmentAPIView(APIView):
    def get(self, request):
        departments = Department.objects.all()
        serializer = DepartmentSerializer(departments, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = DepartmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)

    def put(self, request, pk):
        department = Department.objects.get(department_id=pk)
        serializer = DepartmentSerializer(instance=department, data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)

    def delete(self, request, pk):
        department = Department.objects.get(department_id=pk)
        department.delete()
        return Response('Department deleted successfully')


class SectionAPIView(APIView):
    def get(self, request):
        sections = Section.objects.all()
        serializer = SectionSerializer(sections, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = SectionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)

    def put(self, request, pk):
        section = Section.objects.get(section_id=pk)
        serializer = SectionSerializer(instance=section, data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)

    def delete(self, request, pk):
        section = Section.objects.get(section_id=pk)
        section.delete()
        return Response('Section deleted successfully')


class CourseAPIView(APIView):
    def get(self, request):
        courses = Course.objects.all()
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)

    def put(self, request, pk):
        course = Course.objects.get(course_id=pk)
        serializer = CourseSerializer(instance=course, data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)

    def delete(self, request, pk):
        course = Course.objects.get(course_id=pk)
        course.delete()
        return Response('Course deleted successfully')