from users.api.views import UserApiViewSet
from django.urls import path
from rest_framework.routers import DefaultRouter
from users.api.views_auth import LoginView, LogoutView
from users.api.views import CurrentUserApiView

router_user = DefaultRouter()

router_user.register(
    prefix='users',
    viewset=UserApiViewSet,
    basename='users'
)

urlpatterns = [
    path('auth/login/', LoginView.as_view(), name='login'),
    path('auth/logout/', LogoutView.as_view(), name='logout'),
    path('auth/me/', CurrentUserApiView.as_view(), name='current_user'),
]

