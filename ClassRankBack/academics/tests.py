from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import Student, Subject, Section, Enrollment, TeacherQualification

User = get_user_model()

class StudentModelTest(TestCase):
    def test_creacion_estudiante(self):
        student = Student.objects.create(
            code=12345,
            first_name="Juan",
            last_name="Pérez",
            special_attention=True,
            strikes=2
        )
        self.assertEqual(student.code, 12345)
        self.assertTrue(student.special_attention)
        self.assertEqual(str(student), "12345 Juan Pérez True 2")

    def test_codigo_unico(self):
        Student.objects.create(code=111, first_name="Ana", last_name="López")
        with self.assertRaises(Exception):
            Student.objects.create(code=111, first_name="Pedro", last_name="Gómez")

class SubjectModelTest(TestCase):
    def test_creacion_materia(self):
        subject = Subject.objects.create(name_subject="Matemáticas", credits=5)
        self.assertEqual(subject.name_subject, "Matemáticas")
        self.assertEqual(subject.credits, 5)

    def test_nombre_materia_unico(self):
        Subject.objects.create(name_subject="Historia", credits=3)
        with self.assertRaises(Exception):
            Subject.objects.create(name_subject="Historia", credits=4)

class SectionModelTest(TestCase):
    def setUp(self):
        self.subject = Subject.objects.create(name_subject="Física", credits=4)
        self.teacher = User.objects.create_user(email_teacher="test@academicos.udg.mx", password="1234", first_name="Luis", last_name="García")

    def test_creacion_seccion(self):
        section = Section.objects.create(
            term="2023A",
            schedule_start="08:00",
            schedule_end="10:00",
            classrooms="101",
            subject=self.subject,
            teacher=self.teacher
        )
        self.assertEqual(section.term, "2023A")
        self.assertEqual(section.teacher.first_name, "Luis")

    def test_unicidad_periodo_salon(self):
        Section.objects.create(
            term="2023B",
            schedule_start="09:00",
            schedule_end="11:00",
            classrooms="102",
            subject=self.subject
        )
        with self.assertRaises(Exception):
            Section.objects.create(
                term="2023B",
                schedule_start="12:00",
                schedule_end="14:00",
                classrooms="102",
                subject=self.subject
            )

class EnrollmentModelTest(TestCase):
    def setUp(self):
        self.student = Student.objects.create(code=222, first_name="Carlos", last_name="Ruiz")
        self.subject = Subject.objects.create(name_subject="Química", credits=6)
        self.section = Section.objects.create(
            term="2023C",
            schedule_start="10:00",
            schedule_end="12:00",
            classrooms="103",
            subject=self.subject
        )

    def test_creacion_curso(self):
        enrollment = Enrollment.objects.create(
            student=self.student,
            section=self.section,
            score=8.5,
            feedback="Buen desempeño"
        )
        self.assertEqual(enrollment.score, 8.5)
        self.assertEqual(enrollment.feedback, "Buen desempeño")

    def test_unicidad_alumno_seccion(self):
        Enrollment.objects.create(student=self.student, section=self.section, score=7)
        with self.assertRaises(Exception):
            Enrollment.objects.create(student=self.student, section=self.section, score=9)

class TeacherQualificationModelTest(TestCase):
    def setUp(self):
        self.teacher = User.objects.create_user(email_teacher="stra.academica@sems.udg.mx", password="abcd", first_name="Ana", last_name="Martínez")
        self.subject = Subject.objects.create(name_subject="Biología", credits=4)

    def test_creacion_qualification(self):
        qual = TeacherQualification.objects.create(teacher=self.teacher, subject=self.subject)
        self.assertEqual(qual.teacher.first_name, "Ana")
        self.assertEqual(qual.subject.name_subject, "Biología")

    def test_unicidad_teacher_subject(self):
        TeacherQualification.objects.create(teacher=self.teacher, subject=self.subject)
        with self.assertRaises(Exception):
            TeacherQualification.objects.create(teacher=self.teacher, subject=self.subject)
