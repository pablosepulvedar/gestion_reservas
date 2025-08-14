from rest_framework import serializers
from .models import Cliente, Servicio, Reserva

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

    class Meta:
        model = Reserva
        fields = '__all__'