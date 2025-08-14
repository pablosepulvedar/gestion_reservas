from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate
from .models import Cliente, Servicio, Reserva, Usuario, Empresa
from .serializers import ClienteSerializer, ServicioSerializer, ReservaSerializer, LoginSerializer, UsuarioSerializer,EmpresaSerializer

# --- ViewSets existentes ---
class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer

class ServicioViewSet(viewsets.ModelViewSet):
    queryset = Servicio.objects.all()
    serializer_class = ServicioSerializer

class ReservaViewSet(viewsets.ModelViewSet):
    queryset = Reserva.objects.all()
    serializer_class = ReservaSerializer

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class EmpresaViewSet(viewsets.ModelViewSet):
    queryset = Empresa.objects.all()
    serializer_class = EmpresaSerializer

class LoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        empresa_id = request.data.get("empresa_id")  # recibimos la empresa seleccionada

        user = authenticate(username=username, password=password)

        if user:
            # Validar que el usuario pertenece a la empresa seleccionada
            if not user.empresa or str(user.empresa.id) != str(empresa_id):
                return Response(
                    {"error": "Usuario no pertenece a esta empresa"},
                    status=status.HTTP_401_UNAUTHORIZED
                )

            # Traer roles
            roles = list(user.roles.values_list("nombre", flat=True))

            return Response({
                "id": user.id,
                "username": user.username,
                "empresa": user.empresa.nombre if user.empresa else None,
                "roles": roles
            })

        return Response({"error": "Credenciales incorrectas"}, status=status.HTTP_401_UNAUTHORIZED)
