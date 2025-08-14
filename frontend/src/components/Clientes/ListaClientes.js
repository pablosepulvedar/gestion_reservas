import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function ListaClientes({ clientes, onEliminar, onEditar }) {
  const [editando, setEditando] = useState(null);
  const [formData, setFormData] = useState({ nombre: "", email: "", telefono: "" });

  const startEdit = (cliente) => {
    setEditando(cliente.id);
    setFormData(cliente);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    onEditar(formData);
    setEditando(null);
  };

  return (
    <div className="mt-4">
      <h2>Clientes</h2>
      <table className="table table-striped table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((c) => (
            <tr key={c.id}>
              {editando === c.id ? (
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
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      className="form-control"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <button className="btn btn-success btn-sm me-2" onClick={handleSave}>Guardar</button>
                    <button className="btn btn-secondary btn-sm" onClick={() => setEditando(null)}>Cancelar</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{c.nombre}</td>
                  <td>{c.email}</td>
                  <td>{c.telefono}</td>
                  <td>
                    <button className="btn btn-primary btn-sm me-2" onClick={() => startEdit(c)}>Editar</button>
                    <button className="btn btn-danger btn-sm" onClick={() => onEliminar(c.id)}>Eliminar</button>
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

export default ListaClientes;