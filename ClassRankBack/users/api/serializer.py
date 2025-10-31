from rest_framework import serializers
from users.models import User
import re

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ['id', 'email_teacher', 'first_name', 'last_name', 'is_staff', 'password','is_active','is_superuser']
    
    def _ensure_privileges(self, attrs):
        request = self.context.get('request')
        if not request or not request.user.is_superuser:
            if 'is_superuser' in attrs:
                attrs.pop('is_superuser', None)
            if 'is_staff' in attrs and attrs['is_staff'] is True:
                raise serializers.ValidationError('Operación no permitida')
        return attrs
    
    def validate_email_teacher(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError('El email es requerido')
        
        pattern = r'^[A-Za-z0-9._%+-]+@academicos\.udg\.mx$|^[A-Za-z0-9._%+-]+@sems\.udg\.mx$'
        if not re.match(pattern, value.strip().lower()):
            raise serializers.ValidationError('El email debe ser una cuenta institucional (@academicos.udg.mx o @sems.udg.mx)')
        
        # Verificar unicidad
        email_clean = value.strip().lower()
        if self.instance is None or self.instance.email_teacher != email_clean:
            if User.objects.filter(email_teacher__iexact=email_clean).exists():
                raise serializers.ValidationError('Ya existe un usuario con este email')
        
        return email_clean

    def validate_first_name(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError('El nombre es requerido')
        
        if len(value.strip()) < 2:
            raise serializers.ValidationError('El nombre debe tener al menos 2 caracteres')
        
        if not re.match(r'^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$', value):
            raise serializers.ValidationError('El nombre solo puede contener letras y espacios')
        
        return value.strip().title()

    def validate_last_name(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError('Los apellidos son requeridos')
        
        if len(value.strip()) < 2:
            raise serializers.ValidationError('Los apellidos deben tener al menos 2 caracteres')
        
        if not re.match(r'^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$', value):
            raise serializers.ValidationError('Los apellidos solo pueden contener letras y espacios')
        
        return value.strip().title()

    def validate_password(self, value):
        if self.instance is None and not value:  # Nuevo usuario
            raise serializers.ValidationError('La contraseña es requerida para nuevos usuarios')
        
        if value:  # Si se proporciona contraseña
            if len(value) < 8:
                raise serializers.ValidationError('La contraseña debe tener al menos 8 caracteres')
            
            if not re.search(r'[A-Z]', value):
                raise serializers.ValidationError('La contraseña debe contener al menos una letra mayúscula')
            
            if not re.search(r'[a-z]', value):
                raise serializers.ValidationError('La contraseña debe contener al menos una letra minúscula')
            
            if not re.search(r'[0-9]', value):
                raise serializers.ValidationError('La contraseña debe contener al menos un número')
        
        return value