from rest_framework import serializers
from academics.models import TeacherQualification, Student, Subject, Enrollment, Section
from users.api.serializer import UserSerializer
import re

class SubjectShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ['id', 'name_subject', 'credits']

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id', 'code', 'first_name', 'last_name', 'strikes', 'special_attention']

    def validate_code(self, value):
        pattern = r'^\d{10}$'
        if not re.match(pattern, value):
            raise serializers.ValidationError('El codigo debe ser de 1o digitos')
        return value

class TeacherQualificationSerializer(serializers.ModelSerializer):
    teacher = UserSerializer(read_only=True)
    subject = SubjectShortSerializer(read_only=True)

    class Meta:
        model = TeacherQualification
        fields = ['id', 'teacher', 'subject']

class SubjectSerializer(serializers.ModelSerializer):
    # devolvemos las instancias del through (teacher + subject)
    teacher_qualifications = TeacherQualificationSerializer(many=True, read_only=True)

    class Meta:
        model = Subject
        fields = ['id', 'name_subject', 'credits', 'teacher_qualifications']


class SectionSerializer(serializers.ModelSerializer):
    subject = SubjectShortSerializer(read_only=True)

    class Meta:
        model = Section
        fields = ['id', 'term', 'schedule_start', 'schedule_end', 'classrooms', 'subject']

class EnrollmentSerializer(serializers.ModelSerializer):
    student = StudentSerializer(read_only=True)
    section = SectionSerializer(read_only=True)

    class Meta:
        model = Enrollment
        fields = ['id', 'student', 'section', 'score', 'feedback']