from django import forms
from .models import Cliente, Reserva

class ClienteForm(forms.ModelForm):
    class Meta:
        model = Cliente
        fields = ['nombre', 'email', 'telefono']

class ReservaForm(forms.ModelForm):
    class Meta:
        model = Reserva
        fields = ['cliente', 'servicio', 'fecha']
        widgets = {
            'fecha': forms.DateInput(attrs={'type': 'date'})
        }