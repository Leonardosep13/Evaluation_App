from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework import status
from rest_framework.decorators import action
from django.db import transaction
from .serializer import (
    StudentSerializer, 
    SubjectSerializer, 
    SectionSerializer, 
    EnrollmentSerializer, 
    TeacherQualificationSerializer
)
from academics.models import TeacherQualification, Student, Subject, Enrollment, Section
from users.models import User

#Devuelve todos los estudiantes:
class StudentApiViewSet(ModelViewSet):
    queryset = Student.objects.all().order_by('last_name', 'first_name')
    serializer_class = StudentSerializer
    permission_classes = [IsAdminUser]

    def create(self, request, *args, **kwargs):
        try:
            with transaction.atomic():
                return super().create(request, *args, **kwargs)
        except Exception as e:
            return Response(
                {'error': 'Error al crear el estudiante', 'details': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

    def update(self, request, *args, **kwargs):
        try:
            with transaction.atomic():
                return super().update(request, *args, **kwargs)
        except Exception as e:
            return Response(
                {'error': 'Error al actualizar el estudiante', 'details': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

#Devuelve todos los cursos con alumnos y profesor
class EnrollmentApiViewSet(ModelViewSet):
    queryset = Enrollment.objects.all().select_related('student', 'section__subject', 'section__teacher')
    serializer_class = EnrollmentSerializer
    permission_classes = [IsAdminUser]

    def create(self, request, *args, **kwargs):
        try:
            with transaction.atomic():
                return super().create(request, *args, **kwargs)
        except Exception as e:
            return Response(
                {'error': 'Error al crear la inscripción', 'details': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

    def update(self, request, *args, **kwargs):
        try:
            with transaction.atomic():
                return super().update(request, *args, **kwargs)
        except Exception as e:
            return Response(
                {'error': 'Error al actualizar la inscripción', 'details': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

#Devuelve todas las materias con los profesores que las imparten
class SubjectApiViewSet(ModelViewSet):
    queryset = Subject.objects.all().order_by('semester','name_subject')
    permission_classes = [IsAdminUser]
    serializer_class = SubjectSerializer

    def create(self, request, *args, **kwargs):
        try:
            with transaction.atomic():
                return super().create(request, *args, **kwargs)
        except Exception as e:
            return Response(
                {'error': 'Error al crear la materia', 'details': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

    def update(self, request, *args, **kwargs):
        try:
            with transaction.atomic():
                return super().update(request, *args, **kwargs)
        except Exception as e:
            return Response(
                {'error': 'Error al actualizar la materia', 'details': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

#Devuelve todas las secciones con su materia y profesor
class SectionApiViewSet(ModelViewSet):
    queryset = Section.objects.all().select_related('subject', 'teacher').order_by('term', 'schedule_start')
    serializer_class = SectionSerializer
    permission_classes = [IsAdminUser]

    def create(self, request, *args, **kwargs):
        try:
            with transaction.atomic():
                return super().create(request, *args, **kwargs)
        except Exception as e:
            return Response(
                {'error': 'Error al crear la sección', 'details': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

    def update(self, request, *args, **kwargs):
        try:
            with transaction.atomic():
                return super().update(request, *args, **kwargs)
        except Exception as e:
            return Response(
                {'error': 'Error al actualizar la sección', 'details': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

#Devuelve todas las asignaciones de materias a profesores
class TeacherQualificationApiViewSet(ModelViewSet):
    queryset = TeacherQualification.objects.all().select_related('teacher', 'subject').order_by('teacher__last_name', 'subject__name_subject')
    serializer_class = TeacherQualificationSerializer
    permission_classes = [IsAdminUser]

    def create(self, request, *args, **kwargs):
        try:
            with transaction.atomic():
                return super().create(request, *args, **kwargs)
        except Exception as e:
            return Response(
                {'error': 'Error al crear la cualificación', 'details': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

    def update(self, request, *args, **kwargs):
        try:
            with transaction.atomic():
                return super().update(request, *args, **kwargs)
        except Exception as e:
                return Response(
                {'error': 'Error al actualizar la cualificación', 'details': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

