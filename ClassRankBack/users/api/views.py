from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction
from ..models import User
from .serializer import UserSerializer
from django.contrib.auth.hashers import make_password

class UserApiViewSet(ModelViewSet):
    permission_classes = [IsAdminUser]
    serializer_class = UserSerializer
    queryset = User.objects.all().order_by('last_name', 'first_name')

    def create(self, request, *args, **kwargs):
        try:
            with transaction.atomic():
                if 'password' in request.data and request.data['password']:
                    request.data['password'] = make_password(request.data['password'])
                
                return super().create(request, *args, **kwargs)
        except Exception as e:
            return Response(
                {'error': 'Error al crear el profesor', 'details': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
    
    def update(self, request, *args, **kwargs):
        try:
            with transaction.atomic():
                if 'password' in request.data and request.data['password']:
                    request.data['password'] = make_password(request.data['password'])

                elif 'password' in request.data and not request.data['password']:
                    instance = self.get_object()
                    request.data['password'] = instance.password
                return super().update(request, *args, **kwargs)
            
        except Exception as e:
            return Response(
                {'error': 'Error al actualizar el profesor', 'details': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
    
    def partial_update(self, request, *args, **kwargs):
        try:
            with transaction.atomic():
                if 'password' in request.data and request.data['password']:
                    request.data['password'] = make_password(request.data['password'])
                elif 'password' in request.data and not request.data['password']:
                    instance = self.get_object()
                    request.data['password'] = instance.password
                
                return super().partial_update(request, *args, **kwargs)
        except Exception as e:
            return Response(
                {'error': 'Error al actualizar el profesor', 'details': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
    
    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            
            if instance.is_staff and not request.user.is_superuser:
                return Response(
                    {
                        'error': 'Permisos insuficientes',
                        'details': 'Solo los superusuarios pueden eliminar usuarios con permisos de staff'
                    },
                    status=status.HTTP_403_FORBIDDEN
                )
            
            if instance.id == request.user.id:
                return Response(
                    {
                        'error': 'Operación no permitida',
                        'details': 'No puedes eliminar tu propia cuenta'
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            with transaction.atomic():
                return super().destroy(request, *args, **kwargs)
                
        except Exception as e:
            return Response(
                {'error': 'Error al eliminar el profesor', 'details': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

class CurrentUserApiView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)