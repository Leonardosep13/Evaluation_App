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
    SubjectCreateSerializer,
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
    queryset = Subject.objects.all().prefetch_related('teacher_qualifications__teacher').order_by('name_subject')
    permission_classes = [IsAdminUser]

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return SubjectCreateSerializer
        return SubjectSerializer

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


# Vistas adicionales para obtener listas simplificadas para formularios
class FormDataAPIView(APIView):
    """Vista para obtener datos necesarios para formularios"""
    permission_classes = [IsAdminUser]

    def get(self, request, *args, **kwargs):
        try:
            # Lista de estudiantes para formularios
            students = Student.objects.all().values('id', 'code', 'first_name', 'last_name').order_by('last_name', 'first_name')
            
            # Lista de materias para formularios
            subjects = Subject.objects.all().values('id', 'name_subject', 'credits').order_by('name_subject')
            
            # Lista de profesores para formularios
            teachers = User.objects.all().values('id', 'first_name', 'last_name', 'email_teacher').order_by('last_name', 'first_name')
            
            # Lista de secciones para formularios
            sections = Section.objects.select_related('subject', 'teacher').all().order_by('term', 'schedule_start')
            sections_data = []
            for section in sections:
                teacher_name = f"{section.teacher.first_name} {section.teacher.last_name}" if section.teacher else "Sin asignar"
                sections_data.append({
                    'id': section.id,
                    'display_name': f"{section.term} - {section.subject.name_subject} - {teacher_name}",
                    'term': section.term,
                    'subject_name': section.subject.name_subject,
                    'teacher_name': teacher_name,
                    'schedule': f"{section.schedule_start} - {section.schedule_end}",
                    'classroom': section.classrooms
                })

            return Response({
                'students': list(students),
                'subjects': list(subjects),
                'teachers': list(teachers),
                'sections': sections_data
            })
        except Exception as e:
            return Response(
                {'error': 'Error al obtener datos del formulario', 'details': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class QualifiedTeachersAPIView(APIView):
    """Vista para obtener profesores cualificados para una materia específica"""
    permission_classes = [IsAdminUser]

    def get(self, request, subject_id, *args, **kwargs):
        try:
            qualified_teachers = User.objects.filter(
                teacher_qualifications__subject_id=subject_id
            ).values('id', 'first_name', 'last_name', 'email_teacher').order_by('last_name', 'first_name')
            
            return Response(list(qualified_teachers))
        except Exception as e:
            return Response(
                {'error': 'Error al obtener profesores cualificados', 'details': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

