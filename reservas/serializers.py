from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Cliente, Servicio, Reserva, Rol, Empresa

Usuario = get_user_model()

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = '__all__'

class ServicioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servicio
        fields = '__all__'

class ReservaSerializer(serializers.ModelSerializer):
    cliente = ClienteSerializer(read_only=True)
    servicio = ServicioSerializer(read_only=True)
    cliente_id = serializers.PrimaryKeyRelatedField(
        queryset=Cliente.objects.all(), write_only=True, source='cliente'
    )
    servicio_id = serializers.PrimaryKeyRelatedField(
        queryset=Servicio.objects.all(), write_only=True, source='servicio'
    )

    class Meta:
        model = Reserva
        fields = '__all__'

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

# --- Serializers nuevos para Usuario ---
class EmpresaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empresa
        fields = ['id', 'nombre']

class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rol
        fields = ['id', 'nombre']

class UsuarioSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    empresa = EmpresaSerializer(read_only=True)  # trae datos completos de la empresa
    empresa_id = serializers.PrimaryKeyRelatedField(
        queryset=Empresa.objects.all(), source='empresa', write_only=True
    )
    roles = RolSerializer(many=True, read_only=True)
    roles_ids = serializers.PrimaryKeyRelatedField(
        queryset=Rol.objects.all(), source='roles', many=True, write_only=True
    )

    class Meta:
        model = Usuario
        fields = [
            'id', 'username', 'first_name', 'last_name', 'email', 'password',
            'empresa', 'empresa_id', 'roles', 'roles_ids'
        ]

    def create(self, validated_data):
        roles_data = validated_data.pop('roles', [])
        password = validated_data.pop('password')
        usuario = Usuario(**validated_data)
        usuario.set_password(password)
        usuario.save()
        if roles_data:
            usuario.roles.set(roles_data)
        return usuario

    def update(self, instance, validated_data):
        roles_data = validated_data.pop('roles', None)
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        if roles_data is not None:
            instance.roles.set(roles_data)
        return instance
