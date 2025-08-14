from django.urls import path, include
from rest_framework import routers
from .views import ClienteViewSet, ServicioViewSet, ReservaViewSet, LoginView, UsuarioViewSet, EmpresaViewSet

# Router para los ViewSets
router = routers.DefaultRouter()
router.register(r'clientes', ClienteViewSet)
router.register(r'servicios', ServicioViewSet)
router.register(r'reservas', ReservaViewSet)
router.register(r'usuarios', UsuarioViewSet)
router.register(r'empresas', EmpresaViewSet)

# URLs finales
urlpatterns = [
    path('', include(router.urls)),        # rutas de clientes, servicios y reservas
    path('login/', LoginView.as_view(), name='login'),  # ruta de login
]