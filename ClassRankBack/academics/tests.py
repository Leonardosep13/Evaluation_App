from django.test import TestCase, Client
from django.contrib.auth import get_user_model
from django.urls import reverse
from django.core.exceptions import ValidationError
from rest_framework.test import APITestCase
from rest_framework import status
from .models import Student, Subject, Section, Enrollment, TeacherQualification
from datetime import time
import json

User = get_user_model()


class AcademicModelsTestCase(TestCase):
    """Test cases for academic models"""
    
    def setUp(self):
        """Set up test data"""
        self.user = User.objects.create_user(
            email_teacher='profesor.test@academicos.udg.mx',
            password='testpass123',
            first_name='Juan',
            last_name='Pérez'
        )
        
    def test_user_creation(self):
        """Test custom user model creation"""
        self.assertEqual(self.user.email_teacher, 'profesor.test@academicos.udg.mx')
        self.assertEqual(self.user.first_name, 'Juan')
        self.assertEqual(self.user.last_name, 'Pérez')
        self.assertTrue(self.user.check_password('testpass123'))
        
    def test_user_string_representation(self):
        """Test user string representation"""
        self.assertEqual(str(self.user), 'Juan Pérez')
        
    def test_invalid_email_creation(self):
        """Test that invalid emails are rejected"""
        with self.assertRaises(ValueError):
            User.objects.create_user(
                email_teacher='invalid@gmail.com',
                password='testpass123'
            )
            
    def test_valid_institutional_emails(self):
        """Test valid institutional email domains"""
        valid_emails = [
            'profesor@academicos.udg.mx',
            'maestro@sems.udg.mx',
            'test.user@academicos.udg.mx'
        ]
        
        for email in valid_emails:
            user = User.objects.create_user(
                email_teacher=email,
                password='testpass123'
            )
            self.assertEqual(user.email_teacher, email)
            user.delete()  # Clean up
            
    def test_empty_email_validation(self):
        """Test empty email validation"""
        with self.assertRaises(ValueError) as context:
            User.objects.create_user(email_teacher='', password='testpass123')
        self.assertEqual(str(context.exception), 'No puedes dejar el campo email vacio')


class AcademicViewsTestCase(TestCase):
    """Test cases for academic views"""
    
    def setUp(self):
        """Set up test client and user"""
        self.client = Client()
        self.user = User.objects.create_user(
            email_teacher='profesor.test@academicos.udg.mx',
            password='testpass123',
            first_name='María',
            last_name='González'
        )
        
    def test_login_required_views(self):
        """Test that protected views require authentication"""
        # Add your protected URLs here
        protected_urls = [
            # reverse('academics:dashboard'),
            # reverse('academics:profile'),
        ]
        
        for url in protected_urls:
            response = self.client.get(url)
            self.assertIn(response.status_code, [302, 401, 403])
            
    def test_authenticated_user_access(self):
        """Test authenticated user can access protected views"""
        login_success = self.client.login(
            email_teacher='profesor.test@academicos.udg.mx',
            password='testpass123'
        )
        self.assertTrue(login_success)
        
        # Add your authenticated URLs here
        authenticated_urls = [
            # reverse('academics:dashboard'),
        ]
        
        for url in authenticated_urls:
            response = self.client.get(url)
            self.assertEqual(response.status_code, 200)
            
    def test_login_with_email(self):
        """Test login using email_teacher field"""
        response = self.client.post('/admin/login/', {
            'username': 'profesor.test@academicos.udg.mx',
            'password': 'testpass123'
        })
        # Test should pass if login mechanism works with email


class AcademicAPITestCase(APITestCase):
    """Test cases for academic API endpoints"""
    
    def setUp(self):
        """Set up API test data"""
        self.user = User.objects.create_user(
            email_teacher='profesor.api@academicos.udg.mx',
            password='testpass123',
            first_name='Carlos',
            last_name='Rodríguez'
        )
        
    def test_api_authentication(self):
        """Test API authentication"""
        # Test unauthenticated request
        # url = reverse('academics:api-endpoint')  # Replace with actual endpoint
        # response = self.client.get(url)
        # self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
        # Test authenticated request
        self.client.force_authenticate(user=self.user)
        # response = self.client.get(url)
        # self.assertEqual(response.status_code, status.HTTP_200_OK)
        
    def test_api_crud_operations(self):
        """Test CRUD operations through API"""
        self.client.force_authenticate(user=self.user)
        
        # Test CREATE
        data = {
            'name': 'Test Course',
            'description': 'Test Description',
            'teacher': self.user.id
        }
        # response = self.client.post(reverse('academics:api-create'), data)
        # self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
        # Test READ
        # response = self.client.get(reverse('academics:api-list'))
        # self.assertEqual(response.status_code, status.HTTP_200_OK)
        
    def test_teacher_data_filtering(self):
        """Test that teachers only see their own data"""
        # Create another teacher
        other_teacher = User.objects.create_user(
            email_teacher='otro.profesor@sems.udg.mx',
            password='testpass123',
            first_name='Ana',
            last_name='López'
        )
        
        self.client.force_authenticate(user=self.user)
        # Test that API returns only current teacher's data
        # response = self.client.get(reverse('academics:api-list'))
        # self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Verify filtering logic here


class AcademicFormsTestCase(TestCase):
    """Test cases for academic forms"""
    
    def setUp(self):
        """Set up form test data"""
        self.user = User.objects.create_user(
            email_teacher='profesor.forms@academicos.udg.mx',
            password='testpass123',
            first_name='Luis',
            last_name='Martínez'
        )
        
    def test_teacher_registration_form(self):
        """Test teacher registration with institutional email"""
        # Example form data for teacher registration
        form_data = {
            'email_teacher': 'nuevo.profesor@academicos.udg.mx',
            'first_name': 'Roberto',
            'last_name': 'Sánchez',
            'password1': 'complexpassword123',
            'password2': 'complexpassword123'
        }
        
        # Replace with actual form class
        # form = TeacherRegistrationForm(data=form_data)
        # self.assertTrue(form.is_valid())
        
    def test_invalid_email_form(self):
        """Test form validation with invalid email"""
        invalid_data = {
            'email_teacher': 'invalid@gmail.com',
            'first_name': 'Test',
            'last_name': 'User',
            'password1': 'testpass123',
            'password2': 'testpass123'
        }
        
        # Replace with actual form class
        # form = TeacherRegistrationForm(data=invalid_data)
        # self.assertFalse(form.is_valid())
        # self.assertIn('email_teacher', form.errors)


class AcademicUtilsTestCase(TestCase):
    """Test cases for academic utility functions"""
    
    def setUp(self):
        """Set up utility test data"""
        self.teacher = User.objects.create_user(
            email_teacher='profesor.utils@sems.udg.mx',
            password='testpass123',
            first_name='Elena',
            last_name='Ramírez'
        )
    
    def test_teacher_full_name(self):
        """Test teacher full name display"""
        expected_name = "Elena Ramírez"
        self.assertEqual(str(self.teacher), expected_name)
        
    def test_grade_calculation(self):
        """Test grade calculation utilities"""
        # Example grade calculation test
        grades = [85, 90, 78, 92, 88]
        # average = calculate_average(grades)
        # self.assertAlmostEqual(average, 86.6, places=1)
        
    def test_academic_period_validation(self):
        """Test academic period validation"""
        # Test semester/period validation logic
        valid_periods = ['2024-A', '2024-B', '2025-A']
        invalid_periods = ['2024', 'invalid', '2024-C']
        
        # for period in valid_periods:
        #     self.assertTrue(validate_academic_period(period))
        # for period in invalid_periods:
        #     self.assertFalse(validate_academic_period(period))


class AcademicIntegrationTestCase(TestCase):
    """Integration test cases for academic workflows"""
    
    def setUp(self):
        """Set up integration test data"""
        self.client = Client()
        self.teacher = User.objects.create_user(
            email_teacher='profesor.integration@academicos.udg.mx',
            password='testpass123',
            first_name='Patricia',
            last_name='Flores'
        )
        
    def test_teacher_complete_workflow(self):
        """Test complete teacher academic workflow"""
        # Login with email_teacher
        login_success = self.client.login(
            email_teacher='profesor.integration@academicos.udg.mx',
            password='testpass123'
        )
        self.assertTrue(login_success)
        
        # Create academic content
        # response = self.client.post(reverse('academics:create-course'), {
        #     'name': 'Matemáticas Avanzadas',
        #     'code': 'MATH-301',
        #     'credits': 4,
        #     'semester': '2024-A'
        # })
        # self.assertEqual(response.status_code, 302)
        
        # View teacher's courses
        # response = self.client.get(reverse('academics:teacher-courses'))
        # self.assertEqual(response.status_code, 200)
        # self.assertContains(response, 'Matemáticas Avanzadas')


class AcademicSecurityTestCase(TestCase):
    """Security test cases for academic app"""
    
    def setUp(self):
        """Set up security test data"""
        self.client = Client()
        self.teacher1 = User.objects.create_user(
            email_teacher='profesor1@academicos.udg.mx',
            password='pass123',
            first_name='José',
            last_name='García'
        )
        self.teacher2 = User.objects.create_user(
            email_teacher='profesor2@sems.udg.mx',
            password='pass123',
            first_name='Carmen',
            last_name='Jiménez'
        )
        
    def test_teacher_data_isolation(self):
        """Test that teachers can only access their own academic data"""
        # Login as teacher1
        self.client.login(
            email_teacher='profesor1@academicos.udg.mx',
            password='pass123'
        )
        
        # Try to access teacher2's data
        # response = self.client.get(
        #     reverse('academics:teacher-data', kwargs={'teacher_id': self.teacher2.id})
        # )
        # self.assertEqual(response.status_code, 403)  # Forbidden
        
    def test_institutional_email_requirement(self):
        """Test that only institutional emails can register"""
        invalid_emails = [
            'test@gmail.com',
            'user@yahoo.com',
            'profesor@outlook.com',
            'teacher@udg.com'  # Wrong domain
        ]
        
        for email in invalid_emails:
            with self.assertRaises(ValueError):
                User.objects.create_user(
                    email_teacher=email,
                    password='testpass123'
                )
                
    def test_superuser_creation(self):
        """Test superuser creation with institutional email"""
        superuser = User.objects.create_superuser(
            email_teacher='admin@academicos.udg.mx',
            password='adminpass123',
            first_name='Admin',
            last_name='User'
        )
        
        self.assertTrue(superuser.is_staff)
        self.assertTrue(superuser.is_superuser)
        self.assertEqual(superuser.email_teacher, 'admin@academicos.udg.mx')


class StudentModelTestCase(TestCase):
    """Test cases for Student model"""
    
    def setUp(self):
        """Set up student test data"""
        self.student = Student.objects.create(
            code=123456789,
            first_name="Ana",
            last_name="García López",
            special_attention=False,
            strikes=0
        )
    
    def test_student_creation(self):
        """Test student model creation"""
        self.assertEqual(self.student.code, 123456789)
        self.assertEqual(self.student.first_name, "Ana")
        self.assertEqual(self.student.last_name, "García López")
        self.assertFalse(self.student.special_attention)
        self.assertEqual(self.student.strikes, 0)
    
    def test_student_string_representation(self):
        """Test student string representation"""
        expected = "123456789 Ana García López"
        self.assertEqual(str(self.student), expected)
    
    def test_student_unique_code(self):
        """Test student code uniqueness"""
        with self.assertRaises(Exception):
            Student.objects.create(
                code=123456789,  # Same code as setUp
                first_name="Carlos",
                last_name="Pérez"
            )
    
    def test_student_special_attention(self):
        """Test student with special attention"""
        special_student = Student.objects.create(
            code=987654321,
            first_name="Luis",
            last_name="Martínez",
            special_attention=True,
            strikes=2
        )
        self.assertTrue(special_student.special_attention)
        self.assertEqual(special_student.strikes, 2)


class SubjectModelTestCase(TestCase):
    """Test cases for Subject model"""
    
    def setUp(self):
        """Set up subject test data"""
        self.teacher1 = User.objects.create_user(
            email_teacher='profesor1@academicos.udg.mx',
            password='testpass123',
            first_name='María',
            last_name='González'
        )
        self.teacher2 = User.objects.create_user(
            email_teacher='profesor2@sems.udg.mx',
            password='testpass123',
            first_name='Carlos',
            last_name='Rodríguez'
        )
        self.subject = Subject.objects.create(
            name_subject="Matemáticas I",
            credits=8.0
        )
    
    def test_subject_creation(self):
        """Test subject model creation"""
        self.assertEqual(self.subject.name_subject, "Matemáticas I")
        self.assertEqual(self.subject.credits, 8.0)
    
    def test_subject_string_representation(self):
        """Test subject string representation"""
        expected = "Matemáticas I (8.0)"
        self.assertEqual(str(self.subject), expected)
    
    def test_subject_unique_name(self):
        """Test subject name uniqueness"""
        with self.assertRaises(Exception):
            Subject.objects.create(
                name_subject="Matemáticas I",  # Same name
                credits=6.0
            )
    
    def test_many_to_many_qualified_teachers(self):
        """Test qualified teachers relationship"""
        # Add qualified teachers through TeacherQualification
        TeacherQualification.objects.create(
            teacher=self.teacher1,
            subject=self.subject
        )
        TeacherQualification.objects.create(
            teacher=self.teacher2,
            subject=self.subject
        )
        
        qualified_teachers = self.subject.qualified_teachers.all()
        self.assertEqual(qualified_teachers.count(), 2)
        self.assertIn(self.teacher1, qualified_teachers)
        self.assertIn(self.teacher2, qualified_teachers)


class SectionModelTestCase(TestCase):
    """Test cases for Section model"""
    
    def setUp(self):
        """Set up section test data"""
        self.teacher = User.objects.create_user(
            email_teacher='profesor.seccion@academicos.udg.mx',
            password='testpass123',
            first_name='Roberto',
            last_name='Sánchez'
        )
        self.subject = Subject.objects.create(
            name_subject="Física I",
            credits=6.0
        )
        self.section = Section.objects.create(
            term="2024A",
            schedule_start=time(8, 0),
            schedule_end=time(10, 0),
            classrooms="A01",
            subject=self.subject,
            teacher=self.teacher
        )
    
    def test_section_creation(self):
        """Test section model creation"""
        self.assertEqual(self.section.term, "2024A")
        self.assertEqual(self.section.schedule_start, time(8, 0))
        self.assertEqual(self.section.schedule_end, time(10, 0))
        self.assertEqual(self.section.classrooms, "A01")
        self.assertEqual(self.section.subject, self.subject)
        self.assertEqual(self.section.teacher, self.teacher)
    
    def test_section_string_representation(self):
        """Test section string representation"""
        expected = "2024A | A01 | 08:00:00 - 10:00:00 | Física I | Roberto Sánchez"
        self.assertEqual(str(self.section), expected)
    
    def test_section_without_teacher(self):
        """Test section creation without assigned teacher"""
        section_no_teacher = Section.objects.create(
            term="2024B",
            schedule_start=time(14, 0),
            schedule_end=time(16, 0),
            classrooms="B02",
            subject=self.subject
        )
        self.assertIsNone(section_no_teacher.teacher)
        expected = "2024B | B02 | 14:00:00 - 16:00:00 | Física I | Profesor no asignado"
        self.assertEqual(str(section_no_teacher), expected)
    
    def test_section_unique_together_constraint(self):
        """Test unique_together constraint for term, classroom, schedule_start"""
        with self.assertRaises(Exception):
            Section.objects.create(
                term="2024A",  # Same term
                schedule_start=time(8, 0),  # Same start time
                schedule_end=time(12, 0),
                classrooms="A01",  # Same classroom
                subject=self.subject
            )
    
    def test_section_teacher_deletion(self):
        """Test section behavior when teacher is deleted"""
        teacher_id = self.teacher.id
        self.teacher.delete()
        self.section.refresh_from_db()
        self.assertIsNone(self.section.teacher)


class EnrollmentModelTestCase(TestCase):
    """Test cases for Enrollment model"""
    
    def setUp(self):
        """Set up enrollment test data"""
        self.student = Student.objects.create(
            code=202012345,
            first_name="Patricia",
            last_name="Flores Méndez"
        )
        self.teacher = User.objects.create_user(
            email_teacher='profesor.enrollment@sems.udg.mx',
            password='testpass123',
            first_name='Elena',
            last_name='Ramírez'
        )
        self.subject = Subject.objects.create(
            name_subject="Química I",
            credits=7.0
        )
        self.section = Section.objects.create(
            term="2024A",
            schedule_start=time(10, 0),
            schedule_end=time(12, 0),
            classrooms="C03",
            subject=self.subject,
            teacher=self.teacher
        )
        self.enrollment = Enrollment.objects.create(
            student=self.student,
            section=self.section,
            score=85.5,
            absences=2,
            feedback="Buen desempeño, pero debe mejorar asistencia"
        )
    
    def test_enrollment_creation(self):
        """Test enrollment model creation"""
        self.assertEqual(self.enrollment.student, self.student)
        self.assertEqual(self.enrollment.section, self.section)
        self.assertEqual(self.enrollment.score, 85.5)
        self.assertEqual(self.enrollment.absences, 2)
        self.assertEqual(self.enrollment.feedback, "Buen desempeño, pero debe mejorar asistencia")
    
    def test_enrollment_unique_together(self):
        """Test unique_together constraint for student and section"""
        with self.assertRaises(Exception):
            Enrollment.objects.create(
                student=self.student,  # Same student
                section=self.section,  # Same section
                score=90.0
            )
    
    def test_enrollment_default_values(self):
        """Test enrollment default values"""
        simple_enrollment = Enrollment.objects.create(
            student=self.student,
            section=Section.objects.create(
                term="2024B",
                schedule_start=time(14, 0),
                schedule_end=time(16, 0),
                classrooms="D04",
                subject=self.subject,
                teacher=self.teacher
            ),
            score=75.0
        )
        self.assertEqual(simple_enrollment.absences, 0)
        self.assertEqual(simple_enrollment.feedback, "")
    
    def test_student_enrollments_relationship(self):
        """Test student enrollments relationship"""
        enrollments = self.student.enrollments.all()
        self.assertEqual(enrollments.count(), 1)
        self.assertIn(self.enrollment, enrollments)
    
    def test_section_enrollments_relationship(self):
        """Test section enrollments relationship"""
        enrollments = self.section.enrollments.all()
        self.assertEqual(enrollments.count(), 1)
        self.assertIn(self.enrollment, enrollments)


class TeacherQualificationModelTestCase(TestCase):
    """Test cases for TeacherQualification model"""
    
    def setUp(self):
        """Set up teacher qualification test data"""
        self.teacher = User.objects.create_user(
            email_teacher='profesor.qualified@academicos.udg.mx',
            password='testpass123',
            first_name='José',
            last_name='García'
        )
        self.subject1 = Subject.objects.create(
            name_subject="Álgebra Lineal",
            credits=8.0
        )
        self.subject2 = Subject.objects.create(
            name_subject="Cálculo Diferencial",
            credits=8.0
        )
        self.qualification = TeacherQualification.objects.create(
            teacher=self.teacher,
            subject=self.subject1
        )
    
    def test_teacher_qualification_creation(self):
        """Test teacher qualification creation"""
        self.assertEqual(self.qualification.teacher, self.teacher)
        self.assertEqual(self.qualification.subject, self.subject1)
    
    def test_teacher_qualification_unique_together(self):
        """Test unique_together constraint"""
        with self.assertRaises(Exception):
            TeacherQualification.objects.create(
                teacher=self.teacher,  # Same teacher
                subject=self.subject1  # Same subject
            )
    
    def test_multiple_qualifications_per_teacher(self):
        """Test teacher can have multiple subject qualifications"""
        qualification2 = TeacherQualification.objects.create(
            teacher=self.teacher,
            subject=self.subject2
        )
        
        teacher_qualifications = self.teacher.teacher_qualifications.all()
        self.assertEqual(teacher_qualifications.count(), 2)
        
        qualified_subjects = self.teacher.qualified_subjects.all()
        self.assertEqual(qualified_subjects.count(), 2)
        self.assertIn(self.subject1, qualified_subjects)
        self.assertIn(self.subject2, qualified_subjects)
    
    def test_multiple_teachers_per_subject(self):
        """Test subject can have multiple qualified teachers"""
        teacher2 = User.objects.create_user(
            email_teacher='profesor2.qualified@sems.udg.mx',
            password='testpass123',
            first_name='Carmen',
            last_name='Jiménez'
        )
        
        TeacherQualification.objects.create(
            teacher=teacher2,
            subject=self.subject1
        )
        
        subject_qualifications = self.subject1.teacher_qualifications.all()
        self.assertEqual(subject_qualifications.count(), 2)
        
        qualified_teachers = self.subject1.qualified_teachers.all()
        self.assertEqual(qualified_teachers.count(), 2)
        self.assertIn(self.teacher, qualified_teachers)
        self.assertIn(teacher2, qualified_teachers)


class AcademicWorkflowTestCase(TestCase):
    """Integration tests for complete academic workflows"""
    
    def setUp(self):
        """Set up complete academic scenario"""
        # Create teachers
        self.teacher = User.objects.create_user(
            email_teacher='profesor.workflow@academicos.udg.mx',
            password='testpass123',
            first_name='Laura',
            last_name='Martínez'
        )
        
        # Create subjects
        self.subject = Subject.objects.create(
            name_subject="Programación I",
            credits=8.0
        )
        
        # Create teacher qualification
        self.qualification = TeacherQualification.objects.create(
            teacher=self.teacher,
            subject=self.subject
        )
        
        # Create section
        self.section = Section.objects.create(
            term="2024A",
            schedule_start=time(8, 0),
            schedule_end=time(10, 0),
            classrooms="LAB1",
            subject=self.subject,
            teacher=self.teacher
        )
        
        # Create students
        self.student1 = Student.objects.create(
            code=202012001,
            first_name="Diego",
            last_name="Hernández"
        )
        self.student2 = Student.objects.create(
            code=202012002,
            first_name="Sofia",
            last_name="López",
            special_attention=True
        )
    
    def test_complete_enrollment_workflow(self):
        """Test complete student enrollment workflow"""
        # Enroll students in section
        enrollment1 = Enrollment.objects.create(
            student=self.student1,
            section=self.section,
            score=88.0,
            absences=1,
            feedback="Excelente participación"
        )
        
        enrollment2 = Enrollment.objects.create(
            student=self.student2,
            section=self.section,
            score=92.5,
            absences=0,
            feedback="Destacado desempeño"
        )
        
        # Verify relationships
        self.assertEqual(self.section.enrollments.count(), 2)
        self.assertEqual(self.student1.enrollments.count(), 1)
        self.assertEqual(self.student2.enrollments.count(), 1)
        
        # Verify teacher can access all enrollments in their sections
        teacher_sections = self.teacher.sections.all()
        total_enrollments = sum(section.enrollments.count() for section in teacher_sections)
        self.assertEqual(total_enrollments, 2)
    
    def test_academic_performance_tracking(self):
        """Test academic performance tracking"""
        # Create enrollments with different scores
        Enrollment.objects.create(
            student=self.student1,
            section=self.section,
            score=65.0,  # Failing grade
            absences=5
        )
        
        # Update student strikes for failed course
        self.student1.strikes = 1
        self.student1.save()
        
        self.student1.refresh_from_db()
        self.assertEqual(self.student1.strikes, 1)
        
        # Check if student needs special attention due to failures
        if self.student1.strikes > 0:
            self.student1.special_attention = True
            self.student1.save()
        
        self.student1.refresh_from_db()
        self.assertTrue(self.student1.special_attention)
