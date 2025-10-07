from rest_framework import serializers
from users.models import User
import re

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email_teacher', 'first_name', 'last_name', 'password', 'is_staff']
    
    def validate_email_teacher(self, value):
        pattern = r'^[A-Za-z0-9._%+-]+@academicos\.udg\.mx$|^[A-Za-z0-9._%+-]+@sems\.udg\.mx$'
        if not re.match(pattern, value):
            raise serializers.ValidationError('El email debe ser una cuenta institucional')
        return value