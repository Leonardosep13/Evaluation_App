from django.db import models
from django.conf import settings

class Student(models.Model):
    code = models.IntegerField("Codigo de estudiante", unique=True)
    first_name = models.CharField("Nombre", max_length=100)
    last_name = models.CharField("Apellidos", max_length=100)
    special_attention = models.BooleanField("Requiere atencion especial", default=False)
    strikes = models.SmallIntegerField("Materias Reprobadas", default=0)

    def __str__(self):
        return f"{self.code} {self.first_name} {self.last_name}"

    class Meta:
        verbose_name = 'Estudiante'
        verbose_name_plural = 'Estudiantes'


class Subject(models.Model):
    name_subject = models.CharField("Materia", unique=True, max_length=50)
    semester = models.SmallIntegerField("Semestre", blank=True, null=True)
    qualified_teachers = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        through='TeacherQualification',
        related_name='qualified_subjects',
        verbose_name='Profesores que imparten',
        blank=True
    )

    def __str__(self):
        return f"{self.name_subject} "

    class Meta:
        verbose_name = 'Materia'
        verbose_name_plural = 'Materias'


class Section(models.Model):
    term = models.CharField("Periodo", max_length=6)
    schedule_start = models.TimeField("Hora de inicio")
    schedule_end = models.TimeField("Hora de finalizacion")
    classrooms = models.CharField("Salon", max_length=3, null=True)
    max_score = models.FloatField("Calificacion maxima", default=100.0)
    subject = models.ForeignKey(
        Subject,
        on_delete=models.CASCADE,
        related_name='sections',
        verbose_name="Materia"
    )
    teacher = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='sections',  # user.sections -> secciones que imparte
        verbose_name='Profesor'
    )

    def __str__(self):
        teacher_name = f"{self.teacher.first_name} {self.teacher.last_name}" if self.teacher else "Profesor no asignado"
        schedule = f"{self.schedule_start} - {self.schedule_end}"
        return f"{self.term} | {self.classrooms} | {schedule} | {self.subject.name_subject} | {teacher_name}"

    class Meta:
        verbose_name = 'Seccion'
        verbose_name_plural = 'Secciones'
        unique_together = [['term', 'classrooms', 'schedule_start']]


class Enrollment(models.Model):
    # student.enrollments -> instancias de Enrollment para ese estudiante
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='enrollments', verbose_name='Alumno')
    section = models.ForeignKey(Section, on_delete=models.CASCADE, related_name='enrollments', verbose_name='Secciones')
    score = models.FloatField("Calificacion", blank=False, null=False)
    absences = models.SmallIntegerField("Faltas", default=0)
    feedback = models.TextField("Retroalimentacion", blank=True, default="")

    class Meta:
        verbose_name = 'Curso'
        verbose_name_plural = 'Cursos'
        unique_together = [['student', 'section']]


class TeacherQualification(models.Model):
    teacher = models.ForeignKey(settings.AUTH_USER_MODEL,
        related_name='teacher_qualifications',  # user.teacher_qualifications -> instancias del through
        verbose_name="Profesor que imparte",
        on_delete=models.CASCADE
    )
    subject = models.ForeignKey(
        Subject,
        related_name='teacher_qualifications',  # subject.teacher_qualifications -> instancias del through
        verbose_name='Materia',
        on_delete=models.CASCADE
    )

    class Meta:
        verbose_name = 'Materias asignada al profesor'
        verbose_name_plural = 'Materias asignadas a los profesores'
        unique_together = [['teacher', 'subject']]
