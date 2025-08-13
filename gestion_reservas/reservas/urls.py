from django.urls import path
from . import views
from rest_framework import routers
from .views import ClienteViewSet, ServicioViewSet, ReservaViewSet
from django.urls import path, include

urlpatterns = [
    path('clientes/', views.lista_clientes, name='lista_clientes'),
    path('clientes/agregar/', views.agregar_cliente, name='agregar_cliente'),
    path('clientes/editar/<int:cliente_id>/', views.editar_cliente, name='editar_cliente'),
    path('clientes/eliminar/<int:cliente_id>/', views.eliminar_cliente, name='eliminar_cliente'),

    path('reservas/', views.lista_reservas, name='lista_reservas'),
    path('reservas/agregar/', views.agregar_reserva, name='agregar_reserva'),
    path('reservas/editar/<int:reserva_id>/', views.editar_reserva, name='editar_reserva'),
    path('reservas/eliminar/<int:reserva_id>/', views.eliminar_reserva, name='eliminar_reserva'),

    path('reservas/cliente/<int:cliente_id>/', views.lista_reservas, name='lista_reservas_cliente'),
]

router = routers.DefaultRouter()
router.register(r'clientes', ClienteViewSet)
router.register(r'servicios', ServicioViewSet)
router.register(r'reservas', ReservaViewSet)

urlpatterns += [path('api/', include(router.urls))]