from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from .serializer import StudentSerializer, SubjectSerializer, SectionSerializer, EnrollmentSerializer, TeacherQualificationSerializer
from academics.models import TeacherQualification, Student, Subject, Enrollment, Section

#Devuelve todos los estudiantes:
class StudentApiViewSet(ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [IsAdminUser]

#Devuelve todos los cursos con alumnos y profesor
class EnrollmentApiViewSet(ModelViewSet):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer
    permission_classes = [IsAdminUser]

#Devuelve todas las materias con los profesores que las imparten
class SubjectApiViewSet(ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    permission_classes = [IsAdminUser]

#Devuelve todas las secciones con su materia y profesor
class SectionApiViewSet(ModelViewSet):
    queryset = Section.objects.all()
    serializer_class = SectionSerializer
    permission_classes = [IsAdminUser]

#Devuelve todas las asignaciones de materias a profesores
class TeacherQualificationApiViewSet(ModelViewSet):
    queryset = TeacherQualification.objects.all()
    serializer_class = TeacherQualificationSerializer
    permission_classes = [IsAdminUser]



