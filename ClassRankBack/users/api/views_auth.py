# users/api/views_auth.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated

class LoginView(APIView):
    def post(self, request):
        email_teacher = request.data.get('email_teacher')
        password = request.data.get('password')

        user = authenticate(request, username=email_teacher, password=password)
        if not user:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        response = Response({"message": "Login exitoso"}, status=status.HTTP_200_OK)
        response.set_cookie(
            key='access_token',
            value=access_token,
            httponly=True,
            secure=False,
            samesite='Lax',
            max_age=3600,
        )
        return response

class LogoutView(APIView):
    def post(self, request):
        response = Response({"message": "Logout exitoso"}, status=status.HTTP_200_OK)
        response.delete_cookie('access_token')
        return response