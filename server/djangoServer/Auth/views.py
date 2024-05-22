
from .models import Student

# Create your views here.

from django.http import HttpResponse, JsonResponse
from django.core import serializers
from django.views.decorators.csrf import csrf_exempt
from django.middleware import csrf


def csrf_token(request):
    return HttpResponse(csrf.get_token(request))

@csrf_exempt
def login(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        if(email == None or password == None):
            return HttpResponse("Fields Missing")
        try:
            student = Student.objects.get(email=email, password=password)
            data = serializers.serialize('json', [student, ])
            
            return JsonResponse(data, safe=False)
        except Student.DoesNotExist:
            return HttpResponse("Invalid credentials")
    else:  
        return HttpResponse("Invalid request method")

    

def register(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        fname = request.POST.get('fname')
        mname = request.POST.get('mname')
        lname = request.POST.get('lname')
        section = request.POST.get('section')
        roll = request.POST.get('roll')
        year = request.POST.get('year')
        semester = request.POST.get('semester')
        phone = request.POST.get('phone')
        studentId = request.POST.get('studentId')
        try:
            student = Student.objects.get(email=email)
            return HttpResponse("User already exists")
        except Student.DoesNotExist:
            student = Student(email=email, password=password, fname=fname, mname=mname, lname=lname, section=section, roll=roll, year=year, semester=semester, phone=phone, studentId=studentId)
            student.save()
            return HttpResponse("User created successfully")
    else:
        return HttpResponse(csrf.get_token(request))


