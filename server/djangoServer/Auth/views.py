from .models import Student, Teacher, Department, Section, Course
from .serializers import StudentSerializer, TeacherSerializer, DepartmentSerializer, SectionSerializer, CourseSerializer, UserSerializer
from rest_framework.decorators import api_view # type: ignore
from rest_framework.response import Response # type: ignore
from rest_framework.authtoken.models import Token # type: ignore
from django.contrib.auth import authenticate, login
from rest_framework.views import APIView # type: ignore
from django.contrib.auth.models import User


# Create your views here.

@api_view(['POST'])
def login_view(request):
    username = request.data['username']
    password = request.data['password']

    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        user = UserSerializer(user)
        return Response(user.data)
    else:
        return Response({"message" : "Invalid credentials"}, status=204)
    
class UserAPIView(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            user = User.objects.get(username=request.data['username'])
            user.set_password(request.data['password'])
            user.groups.add(1)
            user.save()
            return Response({"data": serializer.data}, status=201)
        
        return Response("User Already Exists", status=204)

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
    
@api_view(['GET'])
def get_student(request, pk):
    user = User.objects.get(id=pk)
    students = Student.objects.filter(student_id=user.student.student_id)
    serializer = StudentSerializer(students, many=True)
    if serializer.data == []:
        return Response({'message':'No student found'}, status=204)
    return Response(serializer.data)

class StudentAPIView(APIView):
    def get(self, request):
        students = Student.objects.all()
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)
            return Response(serializer.errors, status=400)
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
    

@api_view(['GET'])
def get_teacher(request, pk):
    user = User.objects.get(id=pk)
    teachers = Teacher.objects.filter(teacher_id = user.teacher.teacher_id)
    serializer = TeacherSerializer(teachers, many=True)
    if serializer.data == []:
        return Response({'message':'No teacher found'}, status=204)
    return Response(serializer.data)
    
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

@api_view(['GET'])
def get_department_section(request, pk):
    sections = Section.objects.filter(section_department=pk)
    if(sections == []):
        return Response({'message':'No section found'}, status=204)
    serializer = SectionSerializer(sections, many=True)
    if serializer.data == []:
        return Response({'message':'No section found'}, status=204)
    return Response(serializer.data)

@api_view(['GET'])
def get_teacher_department_section(request, pk):
    try:
        user = User.objects.get(id=pk)
        sections = Section.objects.filter(section_department=user.teacher.teacher_department.department_id)
        serializer = SectionSerializer(sections, many=True)
        if serializer.data == []:
            return Response({'message':'No section found'}, status=204)
        return Response(serializer.data)
    except User.teacher.RelatedObjectDoesNotExist:
        return Response({'message':'No user found'}, status=204)

@api_view(['GET'])
def get_section_teacher(request, pk):
    user = User.objects.get(id=pk)
    sections = Section.objects.filter(section_instructor=user.teacher.id)
    serializer = SectionSerializer(sections, many=True)
    if serializer.data == []:
        return Response({'message':'No section found'}, status=204)
    return Response(serializer.data)

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
        else:
            print(serializer.errors)
            return Response(serializer.errors)

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

@api_view(['GET'])
def get_course(request, pk):
    courses = Course.objects.filter(course_id=pk)
    serializer = CourseSerializer(courses, many=True)
    if serializer.data == []:
        return Response({'message':'No course found'}, status=204)
    return Response(serializer.data)
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