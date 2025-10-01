from django.contrib import admin
from .models import Student, Subject, Section, Enrollment, TeacherQualification

# Register your models here.
admin.site.register(Student)
admin.site.register(Subject)
admin.site.register(Section)
admin.site.register(Enrollment)
admin.site.register(TeacherQualification)
