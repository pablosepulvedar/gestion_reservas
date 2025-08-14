import { useState } from "react";

function ListaUsuarios({ usuarios, onEditar, onEliminar }) {
  const [editando, setEditando] = useState(null);
  const [formData, setFormData] = useState({ username: "", first_name: "", last_name: "", email: "", empresa: "", roles: [] });

  const startEdit = (usuario) => {
    setEditando(usuario.id);
    setFormData({
      ...usuario,
      roles: usuario.roles.map(r => r.toString())
    });
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
    <div className="table-responsive">
      <h2>Usuarios</h2>
      <table className="table table-striped table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>Usuario</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Empresa</th>
            <th>Roles</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.id}>
              {editando === u.id ? (
                <>
                  <td><input className="form-control" name="username" value={formData.username} onChange={handleChange} /></td>
                  <td><input className="form-control" name="first_name" value={formData.first_name} onChange={handleChange} /></td>
                  <td><input className="form-control" name="last_name" value={formData.last_name} onChange={handleChange} /></td>
                  <td><input className="form-control" name="email" value={formData.email} onChange={handleChange} /></td>
                  <td><input className="form-control" name="empresa" value={formData.empresa.nombre} onChange={handleChange} /></td>
                  <td><input className="form-control" name="roles" value={formData.roles.join(",")} onChange={handleChange} /></td>
                  <td>
                    <button className="btn btn-success btn-sm me-2" onClick={handleSave}>Guardar</button>
                    <button className="btn btn-secondary btn-sm" onClick={() => setEditando(null)}>Cancelar</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{u.username}</td>
                  <td>{u.first_name}</td>
                  <td>{u.last_name}</td>
                  <td>{u.email}</td>
                  <td>{u.empresa.nombre}</td>
                  <td>{u.roles.map(r => r.nombre).join(", ")}</td>
                  <td>
                    <button className="btn btn-primary btn-sm me-2" onClick={() => startEdit(u)}>Editar</button>
                    <button className="btn btn-danger btn-sm" onClick={() => onEliminar(u.id)}>Eliminar</button>
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

export default ListaUsuarios;
