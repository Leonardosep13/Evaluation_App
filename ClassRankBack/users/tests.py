from django.test import TestCase
from django.db.utils import IntegrityError
from .models import User

class UserModelTest(TestCase):
    def test_create_user(self):
        user = User.objects.create_user(
            email_teacher='test@academicos.udg.mx',
            password='testpass123',
            first_name='John',
            last_name='Doe'
        )
        self.assertEqual(user.email_teacher, 'test@academicos.udg.mx')
        self.assertTrue(user.check_password('testpass123'))
        self.assertEqual(user.first_name, 'John')
        self.assertEqual(user.last_name, 'Doe')

    def test_str_method(self):
        user = User.objects.create_user(
            email_teacher='stra.academica@sems.udg.mx',
            password='pass',
            first_name='Jane',
            last_name='Smith'
        )
        self.assertEqual(str(user), 'Jane Smith')

    def test_unique_email_teacher(self):
        User.objects.create_user(
            email_teacher='unique.academica@sems.udg.mx',
            password='pass'
        )
        with self.assertRaises(IntegrityError):
            User.objects.create_user(
                email_teacher='unique.academica@sems.udg.mx',
                password='pass2'
            )
