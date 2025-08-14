import { useState, useEffect } from "react";
import api from "../../api/api";
import Select from "react-select"; // Importa React Select

function Login({ onLoginExitoso }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [empresa, setEmpresa] = useState(null);
  const [empresas, setEmpresas] = useState([]);
  const [mensaje, setMensaje] = useState(null);
  const [tipoMensaje, setTipoMensaje] = useState(null);

  // Cargar empresas al iniciar
  useEffect(() => {
    api.get("empresas/")
      .then(res => {
        const options = res.data.map(e => ({ value: e.id, label: e.nombre }));
        setEmpresas(options);
      })
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!empresa) {
      setTipoMensaje("error");
      setMensaje("Debes seleccionar una empresa ❌");
      return;
    }

    api.post("login/", {
      username,
      password,
      empresa_id: empresa.value
    })
    .then(res => {
      onLoginExitoso(res.data);
    })
    .catch(() => {
      setTipoMensaje("error");
      setMensaje("Usuario, contraseña o empresa incorrecta ❌");
      setTimeout(() => setMensaje(null), 3000);
    });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="p-4 border rounded shadow-sm bg-light" style={{ minWidth: "320px", maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>

        {mensaje && (
          <p className="text-center" style={{ color: tipoMensaje === "error" ? "red" : "green" }}>
            {mensaje}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Usuario"
            className="form-control mb-3"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="form-control mb-3"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          <Select
            options={empresas}
            value={empresa}
            onChange={setEmpresa}
            placeholder="-- Selecciona Empresa --"
            isSearchable={empresas.length > 5} // Activar búsqueda solo si hay más de 5 empresas
            className="mb-3"
          />

          <button type="submit" className="btn btn-primary w-100">Ingresar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
