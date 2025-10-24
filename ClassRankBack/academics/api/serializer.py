from rest_framework import serializers
from academics.models import TeacherQualification, Student, Subject, Enrollment, Section
from users.api.serializer import UserSerializer
from users.models import User
import re
from datetime import datetime

class SubjectShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ['id', 'name_subject', 'semester']

class SubjectCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ['id', 'name_subject', 'semester']

    def validate_name_subject(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError('El nombre de la materia es requerido')
        
        if len(value.strip()) < 3:
            raise serializers.ValidationError('El nombre de la materia debe tener al menos 3 caracteres')
        
        if len(value.strip()) > 50:
            raise serializers.ValidationError('El nombre de la materia no puede exceder 50 caracteres')
        
        # Verificar unicidad
        value_clean = value.strip()
        if self.instance is None or self.instance.name_subject != value_clean:
            if Subject.objects.filter(name_subject__iexact=value_clean).exists():
                raise serializers.ValidationError('Ya existe una materia con este nombre')
        
        return value_clean

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id', 'code', 'first_name', 'last_name', 'strikes', 'special_attention']

    def validate_code(self, value):
        if value is None or value <= 0:
            raise serializers.ValidationError('El código debe ser un número positivo')
        
        # Verificar que tenga exactamente 10 dígitos
        if len(str(value)) != 10:
            raise serializers.ValidationError('El código debe tener exactamente 10 dígitos')
        
        # Verificar unicidad si es una nueva instancia o si el código cambió
        if self.instance is None or self.instance.code != value:
            if Student.objects.filter(code=value).exists():
                raise serializers.ValidationError('Ya existe un estudiante con este código')
        
        return value

    def validate_first_name(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError('El nombre es requerido')
        
        if len(value.strip()) < 2:
            raise serializers.ValidationError('El nombre debe tener al menos 2 caracteres')
        
        if not re.match(r'^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$', value):
            raise serializers.ValidationError('El nombre solo puede contener letras y espacios')
        
        return value.strip().title()

    def validate_last_name(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError('Los apellidos son requeridos')
        
        if len(value.strip()) < 2:
            raise serializers.ValidationError('Los apellidos deben tener al menos 2 caracteres')
        
        if not re.match(r'^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$', value):
            raise serializers.ValidationError('Los apellidos solo pueden contener letras y espacios')
        
        return value.strip().title()

    def validate_strikes(self, value):
        if value < 0:
            raise serializers.ValidationError('Las materias reprobadas no pueden ser negativas')
        
        if value > 20:
            raise serializers.ValidationError('El número de materias reprobadas parece excesivo')
        
        return value

class TeacherQualificationSerializer(serializers.ModelSerializer):
    teacher = UserSerializer(read_only=True)
    subject = SubjectShortSerializer(read_only=True)
    teacher_id = serializers.IntegerField(write_only=True)
    subject_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = TeacherQualification
        fields = ['id', 'teacher', 'subject', 'teacher_id', 'subject_id']

    def validate_teacher_id(self, value):
        if not User.objects.filter(id=value).exists():
            raise serializers.ValidationError('El profesor seleccionado no existe')
        return value

    def validate_subject_id(self, value):
        if not Subject.objects.filter(id=value).exists():
            raise serializers.ValidationError('La materia seleccionada no existe')
        return value

    def validate(self, data):
        teacher_id = data['teacher_id']
        subject_id = data['subject_id']
        
        # Verificar que no exista ya esta cualificación
        if self.instance is None:  # Solo para nuevas cualificaciones
            if TeacherQualification.objects.filter(teacher_id=teacher_id, subject_id=subject_id).exists():
                raise serializers.ValidationError(
                    'Este profesor ya está cualificado para esta materia'
                )
        
        return data

    def create(self, validated_data):
        teacher_id = validated_data.pop('teacher_id')
        subject_id = validated_data.pop('subject_id')
        
        qualification = TeacherQualification.objects.create(
            teacher_id=teacher_id,
            subject_id=subject_id
        )
        return qualification

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ['id', 'name_subject', 'semester']


class SectionSerializer(serializers.ModelSerializer):
    subject = SubjectShortSerializer(read_only=True)
    subject_id = serializers.IntegerField(write_only=True)
    teacher_id = serializers.IntegerField(write_only=True, required=False, allow_null=True)

    class Meta:
        model = Section
        fields = ['id', 'term', 'schedule_start', 'schedule_end', 'classrooms', 'subject', 'subject_id', 'teacher_id']

    def validate_term(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError('El período es requerido')
        
        # Formato: 2024A, 2024B, etc.
        pattern = r'^\d{4}[AB]$'
        if not re.match(pattern, value.strip().upper()):
            raise serializers.ValidationError('El período debe tener el formato AAAAA o AAAAB (ej: 2024A, 2024B)')
        
        return value.strip().upper()

    def validate_classrooms(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError('El salón es requerido')
        
        # Limpiar y convertir a mayúsculas
        clean_value = value.strip().upper()
        
        # Verificar que tenga exactamente 3 caracteres
        if len(clean_value) != 3:
            raise serializers.ValidationError('El código del salón debe tener exactamente 3 caracteres')
        
        # Verificar formato: número-letra (ej: 1-A, 2-B, 3-G)
        pattern = r'^[0-6]-[A-Z]$'
        if not re.match(pattern, clean_value):
            raise serializers.ValidationError('El código del salón debe seguir el formato número-letra (ej: 1-A, 2-B, 3-G)')
        
        return clean_value

    def validate_subject_id(self, value):
        if not Subject.objects.filter(id=value).exists():
            raise serializers.ValidationError('La materia seleccionada no existe')
        return value

    def validate_teacher_id(self, value):
        if value is not None and not User.objects.filter(id=value).exists():
            raise serializers.ValidationError('El profesor seleccionado no existe')
        return value

    def validate(self, data):
        # Verificar que la hora de inicio sea menor que la hora de fin
        if data['schedule_start'] >= data['schedule_end']:
            raise serializers.ValidationError('La hora de inicio debe ser menor que la hora de fin')
        
        # Verificar conflictos de horario para el mismo período y salón
        term = data['term']
        classrooms = data['classrooms']
        schedule_start = data['schedule_start']
        schedule_end = data['schedule_end']
        
        # Query para verificar solapamiento de horarios
        conflicting_sections = Section.objects.filter(
            term=term,
            classrooms=classrooms
        ).exclude(id=self.instance.id if self.instance else None)
        
        for section in conflicting_sections:
            # Verificar si hay solapamiento de horarios
            if (schedule_start < section.schedule_end and schedule_end > section.schedule_start):
                raise serializers.ValidationError(
                    f'Ya existe una sección en el salón {classrooms} con horario conflictivo en el período {term}'
                )
        
        # Verificar que el profesor tenga cualificación para la materia
        teacher_id = data.get('teacher_id')
        subject_id = data.get('subject_id')
        
        if teacher_id and subject_id:
            if not TeacherQualification.objects.filter(teacher_id=teacher_id, subject_id=subject_id).exists():
                raise serializers.ValidationError(
                    'El profesor seleccionado no está cualificado para impartir esta materia'
                )
        
        return data

    def create(self, validated_data):
        subject_id = validated_data.pop('subject_id')
        teacher_id = validated_data.pop('teacher_id', None)
        
        section = Section.objects.create(
            subject_id=subject_id,
            teacher_id=teacher_id,
            **validated_data
        )
        return section

class EnrollmentSerializer(serializers.ModelSerializer):
    student = StudentSerializer(read_only=True)
    section = SectionSerializer(read_only=True)
    student_id = serializers.IntegerField(write_only=True)
    section_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Enrollment
        fields = ['id', 'student', 'section', 'score', 'absences', 'feedback', 'student_id', 'section_id']

    def validate_score(self, value):
        if value is None:
            raise serializers.ValidationError('La calificación es requerida')
        
        if value < 0 or value > 100:
            raise serializers.ValidationError('La calificación debe estar entre 0 y 100')
        
        return value

    def validate_absences(self, value):
        if value < 0:
            raise serializers.ValidationError('Las faltas no pueden ser negativas')
        
        if value > 50:
            raise serializers.ValidationError('El número de faltas parece excesivo')
        
        return value

    def validate_student_id(self, value):
        if not Student.objects.filter(id=value).exists():
            raise serializers.ValidationError('El estudiante seleccionado no existe')
        return value

    def validate_section_id(self, value):
        if not Section.objects.filter(id=value).exists():
            raise serializers.ValidationError('La sección seleccionada no existe')
        return value

    def validate(self, data):
        student_id = data['student_id']
        section_id = data['section_id']
        
        # Verificar que no exista ya una inscripción para este estudiante en esta sección
        if self.instance is None:  # Solo para nuevas inscripciones
            if Enrollment.objects.filter(student_id=student_id, section_id=section_id).exists():
                raise serializers.ValidationError(
                    'El estudiante ya está inscrito en esta sección'
                )
        
        return data

    def create(self, validated_data):
        student_id = validated_data.pop('student_id')
        section_id = validated_data.pop('section_id')
        
        enrollment = Enrollment.objects.create(
            student_id=student_id,
            section_id=section_id,
            **validated_data
        )
        return enrollment