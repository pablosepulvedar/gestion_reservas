import { useEffect, useState } from "react";
import api from "../../api/api";
import ListaServicios from "./ListaServicios";
import AgregarServicio from "./AgregarServicio";

function ServiciosPage() {
  const [servicios, setServicios] = useState([]);

  // Cargar servicios al iniciar
  useEffect(() => {
    api.get("servicios/")
      .then((res) => setServicios(res.data))
      .catch((err) => console.error(err));
  }, []);

  const agregarServicio = (nuevoServicio) => {
    setServicios([...servicios, nuevoServicio]);
  };

  const eliminarServicio = (id) => {
    api.delete(`servicios/${id}/`)
      .then(() => {
        setServicios(servicios.filter(s => s.id !== id));
      })
      .catch((err) => console.error(err));
  };

  const editarServicio = (servicioEditado) => {
    api.put(`servicios/${servicioEditado.id}/`, servicioEditado)
      .then((res) => {
        setServicios(servicios.map(s =>
          s.id === servicioEditado.id ? res.data : s
        ));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Gestión de Servicios</h1>

      {/* Formulario Agregar Servicio */}
      <div className="mb-4 p-3 border rounded shadow-sm bg-light">
        <AgregarServicio onServicioAgregado={agregarServicio} />
      </div>

      {/* Lista de Servicios */}
      <div className="table-responsive">
        <ListaServicios
          servicios={servicios}
          onEliminar={eliminarServicio}
          onEditar={editarServicio}
        />
      </div>
    </div>
  );
}

export default ServiciosPage;