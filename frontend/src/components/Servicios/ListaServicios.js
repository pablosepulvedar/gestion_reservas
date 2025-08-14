import { useState } from "react";

function ListaServicios({ servicios, onEliminar, onEditar }) {
  const [editando, setEditando] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    precio: "",
    duracion_minutos: ""
  });

  const startEdit = (servicio) => {
    setEditando(servicio.id);
    setFormData({
      nombre: servicio.nombre,
      precio: servicio.precio,
      duracion_minutos: servicio.duracion_minutos
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    onEditar({ ...formData, id: editando });
    setEditando(null);
  };

  return (
    <div className="table-responsive">
      <h2>Servicios</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Duración (min)</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {servicios.map((s) => (
            <tr key={s.id}>
              {editando === s.id ? (
                <>
                  <td>
                    <input
                      className="form-control"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      className="form-control"
                      name="precio"
                      value={formData.precio}
                      onChange={handleChange}
                      type="number"
                      min="0"
                    />
                  </td>
                  <td>
                    <input
                      className="form-control"
                      name="duracion_minutos"
                      value={formData.duracion_minutos}
                      onChange={handleChange}
                      type="number"
                      min="0"
                    />
                  </td>
                  <td>
                    <div className="d-flex flex-wrap gap-2">
                      <button className="btn btn-success btn-sm" onClick={handleSave}>
                        Guardar
                      </button>
                      <button className="btn btn-secondary btn-sm" onClick={() => setEditando(null)}>
                        Cancelar
                      </button>
                    </div>
                  </td>
                </>
              ) : (
                <>
                  <td>{s.nombre}</td>
                  <td>${s.precio}</td>
                  <td>{s.duracion_minutos} min</td>
                  <td>
                    <div className="d-flex flex-wrap gap-2">
                      <button className="btn btn-primary btn-sm" onClick={() => startEdit(s)}>
                        Editar
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => onEliminar(s.id)}>
                        Eliminar
                      </button>
                    </div>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaServicios;