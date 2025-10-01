from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
import re
# Create your models here.

class UserManager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, email_teacher, password=None, **extra_fields):
        if not email_teacher:
            raise ValueError('No puedes dejar el campo email vacio')
        pattern = r'^[A-Za-z0-9._%+-]+@academicos\.udg\.mx$|^[A-Za-z0-9._%+-]+@sems\.udg\.mx$'
        if re.match(pattern, email_teacher):
            email_teacher = self.normalize_email(email_teacher)
            user = self.model(email_teacher=email_teacher, **extra_fields)
            user.set_password(password)
            user.save(using=self._db)
        else:
            raise ValueError('El email debe ser una cuenta institucional')
        return user
    
    def create_superuser(self, email_teacher, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email_teacher, password, **extra_fields)

class User(AbstractUser):
    email_teacher = models.EmailField(unique=True)
    USERNAME_FIELD = 'email_teacher'
    REQUIRED_FIELDS = []
    username = None

    objects = UserManager()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    
    class Meta:
        verbose_name = 'Profesor'
        verbose_name_plural = 'Profesores'