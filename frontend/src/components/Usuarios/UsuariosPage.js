import { useState, useEffect } from "react";
import api from "../../api/api";
import AgregarUsuario from "./AgregarUsuario";
import ListaUsuarios from "./ListaUsuarios";

function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = () => {
    api.get("usuarios/")
      .then(res => setUsuarios(res.data))
      .catch(err => console.log(err));
  };

  const agregarUsuario = (nuevoUsuario) => setUsuarios([...usuarios, nuevoUsuario]);
  const eliminarUsuario = (id) => api.delete(`usuarios/${id}/`).then(() => setUsuarios(usuarios.filter(u => u.id !== id)));
  const editarUsuario = (usuarioEditado) => api.put(`usuarios/${usuarioEditado.id}/`, usuarioEditado)
    .then(res => setUsuarios(usuarios.map(u => u.id === res.data.id ? res.data : u)));

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Gestión de Usuarios</h1>

      <div className="mb-4">
        <AgregarUsuario onUsuarioAgregado={agregarUsuario} />
      </div>

      <ListaUsuarios usuarios={usuarios} onEliminar={eliminarUsuario} onEditar={editarUsuario} />
    </div>
  );
}

export default UsuariosPage;
