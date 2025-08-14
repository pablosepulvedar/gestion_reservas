import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import ClientesPage from "./components/Clientes/ClientesPage";
import ReservasPage from "./components/Reservas/ReservasPage";
import ServiciosPage from "./components/Servicios/ServiciosPage";
import UsuariosPage from "./components/Usuarios/UsuariosPage";
import Login from "./components/Login/Login";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [usuario, setUsuario] = useState(null); // estado para usuario logueado

  if (!usuario) {
    // Si no hay usuario logueado, mostrar login
    return <Login onLoginExitoso={setUsuario} />;
  }

  // Usuario logueado: mostrar menú y rutas
  return (
    <Router>
      <div className="my-4" style={{ marginLeft: "10px", marginRight: "20px" }}>
        {/* Menú de navegación */}
        <nav className="mb-4 p-3 bg-light rounded shadow-sm d-flex justify-content-center flex-wrap">
          <Link to="/clientes" className="btn btn-outline-primary mx-2 my-1">Clientes</Link>
          <Link to="/reservas" className="btn btn-outline-success mx-2 my-1">Reservas</Link>
          <Link to="/servicios" className="btn btn-outline-info mx-2 my-1">Servicios</Link>
          <Link to="/usuarios" className="btn btn-outline-warning mx-2 my-1">Usuarios</Link>
          <button
            className="btn btn-outline-danger mx-2 my-1"
            onClick={() => setUsuario(null)} // Cerrar sesión
          >
            Cerrar sesión
          </button>
        </nav>

        {/* Rutas */}
        <div className="p-3 border rounded shadow-sm bg-white">
          <Routes>
            <Route path="/clientes" element={<ClientesPage />} />
            <Route path="/reservas" element={<ReservasPage />} />
            <Route path="/servicios" element={<ServiciosPage />} />
            <Route path="/usuarios" element={<UsuariosPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;