import { useState } from "react";
import api from "../../api/api";

function AgregarServicio({ onServicioAgregado }) {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [duracion_minutos, setDuracionMinutos] = useState("");
  const [mensaje, setMensaje] = useState(null);
  const [tipoMensaje, setTipoMensaje] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    api.post("servicios/", { nombre, precio, duracion_minutos })
      .then((res) => {
        onServicioAgregado(res.data);

        setNombre("");
        setPrecio("");
        setDuracionMinutos("");

        setTipoMensaje("exito");
        setMensaje("Servicio agregado correctamente ✅");
        setTimeout(() => setMensaje(null), 3000);
      })
      .catch(() => {
        setTipoMensaje("error");
        setMensaje("Error al agregar servicio ❌");
        setTimeout(() => setMensaje(null), 3000);
      });
  };

  return (
    <div>
      <h2>Agregar Servicio</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          min="0"
          required
        />
        <input
          type="number"
          placeholder="Duración (minutos)"
          value={duracion_minutos}
          onChange={(e) => setDuracionMinutos(e.target.value)}
          min="0"
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

export default AgregarServicio;