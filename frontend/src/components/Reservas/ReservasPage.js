import { useEffect, useState } from "react";
import api from "../../api/api";
import ListaReservas from "./ListaReservas";
import AgregarReserva from "./AgregarReserva";

function ReservasPage() {
  const [reservas, setReservas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false); // 👈 nuevo estado

  // Cargar reservas, clientes y servicios al iniciar
  useEffect(() => {
    api.get("reservas/").then(res => setReservas(res.data));
    api.get("clientes/").then(res => setClientes(res.data));
    api.get("servicios/").then(res => setServicios(res.data));
  }, []);

  const agregarReserva = (nuevaReserva) => {
    setReservas([...reservas, nuevaReserva]);
    setMostrarFormulario(false); // 👈 volver a la lista después de agregar
  };

  const eliminarReserva = (id) => {
    api.delete(`reservas/${id}/`)
      .then(() => {
        setReservas(reservas.filter(r => r.id !== id));
      })
      .catch((err) => console.error(err));
  };

  const editarReserva = (reservaEditada) => {
    api.put(`reservas/${reservaEditada.id}/`, reservaEditada)
      .then((res) => {
        setReservas(reservas.map(r =>
          r.id === reservaEditada.id ? res.data : r
        ));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Gestión de Reservas</h1>

      {/* Botón para alternar */}
      {!mostrarFormulario ? (
        <button 
          className="btn btn-primary mb-3"
          onClick={() => setMostrarFormulario(true)}
        >
          ➕ Nueva Reserva
        </button>
      ) : (
        <button 
          className="btn btn-secondary mb-3"
          onClick={() => setMostrarFormulario(false)}
        >
          🔙 Volver al Listado
        </button>
      )}

      {/* Mostrar listado o formulario según estado */}
      {!mostrarFormulario ? (
        <div className="table-responsive">
          <ListaReservas
            reservas={reservas}
            clientes={clientes}
            servicios={servicios}
            onEliminar={eliminarReserva}
            onEditar={editarReserva}
          />
        </div>
      ) : (
        <div className="mb-4 p-3 border rounded shadow-sm bg-light">
          <AgregarReserva 
            onReservaAgregada={agregarReserva} 
            clientes={clientes} 
            servicios={servicios} 
          />
        </div>
      )}
    </div>
  );
}

export default ReservasPage;