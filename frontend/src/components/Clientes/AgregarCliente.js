import { useState } from "react";
import api from "../../api/api";

function AgregarCliente({ onClienteAgregado }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mensaje, setMensaje] = useState(null); // Para éxito o error
  const [tipoMensaje, setTipoMensaje] = useState(null); // "exito" o "error"

  const handleSubmit = (e) => {
    e.preventDefault();

    api.post("clientes/", { nombre, email, telefono })
      .then((res) => {
        onClienteAgregado(res.data);

        // Vaciar campos
        setNombre("");
        setEmail("");
        setTelefono("");

        // Mensaje de éxito
        setTipoMensaje("exito");
        setMensaje("Cliente agregado correctamente ✅");

        // Ocultar mensaje después de 3 segundos
        setTimeout(() => setMensaje(null), 3000);
      })
      .catch(() => {
        setTipoMensaje("error");
        setMensaje("Error al agregar cliente ❌");
        setTimeout(() => setMensaje(null), 3000);
      });
  };

  return (
    <div>
      <h2>Agregar Cliente</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          required
        />
        <button type="submit">Guardar</button>
      </form>

      {mensaje && (
        <p style={{ color: tipoMensaje === "exito" ? "green" : "red" }}>
          {mensaje}
        </p>
      )}
    </div>
  );
}

export default AgregarCliente;
