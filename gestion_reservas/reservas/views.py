from django.shortcuts import render, get_object_or_404, redirect
from rest_framework import viewsets
from .models import Cliente, Servicio, Reserva
from .serializers import ClienteSerializer, ServicioSerializer, ReservaSerializer
from .forms import ClienteForm, ReservaForm

def lista_clientes(request):
    clientes = Cliente.objects.all()
    return render(request, 'reservas/lista_clientes.html', {'clientes': clientes})

def lista_reservas(request, cliente_id=None):
    if cliente_id:
        reservas = Reserva.objects.filter(cliente_id=cliente_id)
    else:
        reservas = Reserva.objects.all()
    return render(request, 'reservas/lista_reservas.html', {'reservas': reservas})

def agregar_cliente(request):
    if request.method == 'POST':
        form = ClienteForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('lista_clientes')
    else:
        form = ClienteForm()
    return render(request, 'reservas/agregar_cliente.html', {'form': form})

def agregar_reserva(request):
    if request.method == 'POST':
        form = ReservaForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('lista_reservas')
    else:
        form = ReservaForm()
    return render(request, 'reservas/agregar_reserva.html', {'form': form})

def editar_cliente(request, cliente_id):
    cliente = get_object_or_404(Cliente, pk=cliente_id)
    if request.method == 'POST':
        form = ClienteForm(request.POST, instance=cliente)
        if form.is_valid():
            form.save()
            return redirect('lista_clientes')
    else:
        form = ClienteForm(instance=cliente)
    return render(request, 'reservas/editar_cliente.html', {'form': form})

def eliminar_cliente(request, cliente_id):
    cliente = get_object_or_404(Cliente, pk=cliente_id)
    cliente.delete()
    return redirect('lista_clientes')

def editar_reserva(request, reserva_id):
    reserva = get_object_or_404(Reserva, pk=reserva_id)
    if request.method == 'POST':
        form = ReservaForm(request.POST, instance=reserva)
        if form.is_valid():
            form.save()
            return redirect('lista_reservas')
    else:
        form = ReservaForm(instance=reserva)
    return render(request, 'reservas/editar_reserva.html', {'form': form})

def eliminar_reserva(request, reserva_id):
    reserva = get_object_or_404(Reserva, pk=reserva_id)
    reserva.delete()
    return redirect('lista_reservas')

class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer

class ServicioViewSet(viewsets.ModelViewSet):
    queryset = Servicio.objects.all()
    serializer_class = ServicioSerializer

class ReservaViewSet(viewsets.ModelViewSet):
    queryset = Reserva.objects.all()
    serializer_class = ReservaSerializer