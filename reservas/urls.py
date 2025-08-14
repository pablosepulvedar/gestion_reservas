from django.urls import path, include
from rest_framework import routers
from .views import ClienteViewSet, ServicioViewSet, ReservaViewSet

router = routers.DefaultRouter()
router.register(r'clientes', ClienteViewSet)
router.register(r'servicios', ServicioViewSet)
router.register(r'reservas', ReservaViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
