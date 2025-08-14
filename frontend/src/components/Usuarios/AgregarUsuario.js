import { useState, useEffect } from "react";
import api from "../../api/api";

function AgregarUsuario({ onUsuarioAgregado }) {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [empresaId, setEmpresaId] = useState("");
  const [rolesIds, setRolesIds] = useState([]);
  const [listaRoles, setListaRoles] = useState([]);
  const [listaEmpresas, setListaEmpresas] = useState([]);
  const [mensaje, setMensaje] = useState(null);
  const [tipoMensaje, setTipoMensaje] = useState(null);

  // Cargar empresas y roles al iniciar y normalizar datos
  useEffect(() => {
    api.get("roles/")
      .then(res => {
        // Asegurarse que cada rol tenga id y nombre
        const rolesData = res.data.map(r => r.id && r.nombre ? r : r.rol || r);
        setListaRoles(rolesData);
      })
      .catch(err => console.error(err));

    api.get("empresas/")
      .then(res => {
        // Asegurarse que cada empresa tenga id y nombre
        const empresasData = res.data.map(e => e.id && e.nombre ? e : e.empresa || e);
        setListaEmpresas(empresasData);
      })
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    api.post("usuarios/", {
      username,
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      empresa_id: empresaId,
      roles_ids: rolesIds
    })
    .then(res => {
      onUsuarioAgregado(res.data);

      // Reset campos
      setUsername(""); setFirstName(""); setLastName(""); setEmail(""); setPassword("");
      setEmpresaId(""); setRolesIds([]);

      setTipoMensaje("exito");
      setMensaje("Usuario agregado correctamente ✅");
      setTimeout(() => setMensaje(null), 3000);
    })
    .catch(() => {
      setTipoMensaje("error");
      setMensaje("Error al agregar usuario ❌");
      setTimeout(() => setMensaje(null), 3000);
    });
  };

  return (
    <div className="mb-4 p-3 border rounded shadow-sm bg-light">
      <h2>Agregar Usuario</h2>
      {mensaje && <p style={{ color: tipoMensaje === "exito" ? "green" : "red" }}>{mensaje}</p>}

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Usuario" className="form-control mb-2" value={username} onChange={e => setUsername(e.target.value)} required />
        <input type="text" placeholder="Nombre" className="form-control mb-2" value={firstName} onChange={e => setFirstName(e.target.value)} required />
        <input type="text" placeholder="Apellido" className="form-control mb-2" value={lastName} onChange={e => setLastName(e.target.value)} required />
        <input type="email" placeholder="Email" className="form-control mb-2" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Contraseña" className="form-control mb-2" value={password} onChange={e => setPassword(e.target.value)} required />

        <select className="form-control mb-2" value={empresaId} onChange={e => setEmpresaId(e.target.value)} required>
        <option value="">-- Selecciona Empresa --</option>
        {listaEmpresas.map(emp => (
            <option key={emp.id} value={emp.id}>{emp.nombre}</option>
        ))}
        </select>

        <select multiple className="form-control mb-2" value={rolesIds} onChange={e => setRolesIds(Array.from(e.target.selectedOptions, option => option.value))}>
          {listaRoles.map(rol => (
            <option key={rol.id} value={rol.id}>{rol.nombre}</option>
          ))}
        </select>

        <button type="submit" className="btn btn-primary">Guardar</button>
      </form>
    </div>
  );
}

export default AgregarUsuario;
