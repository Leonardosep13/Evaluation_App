from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from ..models import User
from .serializer import UserSerializer
from django.contrib.auth.hashers import make_password

class UserApiViewSet(ModelViewSet):
    permission_classes = [IsAdminUser]
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def create(self, request, *args, **kwargs):
        request.data['password'] = make_password(request.data['password'])
        return super().create(request, *args, **kwargs)
    
    def partial_update(self, request, *args, **kwargs):
        if (request.data['password']):
            request.data['password'] = make_password(request.data['password'])
        else:
            request.data['password'] = request.user.password
        return super().partial_update(request, *args, **kwargs)
    
class UserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)