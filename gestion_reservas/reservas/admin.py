from django.contrib import admin
from .models import Cliente, Servicio, Reserva

admin.site.register(Cliente)
admin.site.register(Servicio)
admin.site.register(Reserva)