from django.urls import path, include
from rest_framework.routers import DefaultRouter
from academics.api.views import (
    StudentApiViewSet,
    EnrollmentApiViewSet,
    SubjectApiViewSet,
    SectionApiViewSet,
    TeacherQualificationApiViewSet,
)

router = DefaultRouter()
router.register(r'students', StudentApiViewSet, basename='student')
router.register(r'enrollments', EnrollmentApiViewSet, basename='enrollment')
router.register(r'subjects', SubjectApiViewSet, basename='subject')
router.register(r'sections', SectionApiViewSet, basename='section')
router.register(r'teacher-qualifications', TeacherQualificationApiViewSet, basename='teacherqualification')


urlpatterns = [
    path('', include(router.urls)),
]




