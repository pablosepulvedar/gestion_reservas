import { useState, useEffect } from "react";
import api from "../../api/api";

function AgregarReserva({ onReservaAgregada }) {
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [cliente, setCliente] = useState("");
  const [servicio, setServicio] = useState("");
  const [clientes, setClientes] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [mensaje, setMensaje] = useState(null);
  const [tipoMensaje, setTipoMensaje] = useState(null);

  // Cargar clientes y servicios al montar el componente
  useEffect(() => {
    api.get("clientes/")
      .then((res) => setClientes(res.data))
      .catch(() => setClientes([]));
    api.get("servicios/")
      .then((res) => setServicios(res.data))
      .catch(() => setServicios([]));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

        api.post("reservas/", { 
            fecha,
            hora,
            cliente_id: cliente,   // ⚠️ cliente debe ser el ID seleccionado
            servicio_id: servicio  // ⚠️ servicio debe ser el ID seleccionado
        })
      .then((res) => {
        onReservaAgregada(res.data);

        setFecha("");
        setHora("");
        setCliente("");
        setServicio("");

        setTipoMensaje("exito");
        setMensaje("Reserva agregada correctamente ✅");
        setTimeout(() => setMensaje(null), 3000);
      })
      .catch(() => {
        setTipoMensaje("error");
        setMensaje("Error al agregar reserva ❌");
        setTimeout(() => setMensaje(null), 3000);
      });
  };

  return (
    <div>
      <h2>Agregar Reserva</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          placeholder="Fecha"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          required
        />
        <input
          type="time"
          placeholder="Hora"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
          required
        />
        <select
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
          required
        >
          <option value="">Selecciona un cliente</option>
          {clientes.map((c) => (
            <option key={c.id} value={c.id}>{c.nombre}</option>
          ))}
        </select>
        <select
          value={servicio}
          onChange={(e) => setServicio(e.target.value)}
          required
        >
          <option value="">Selecciona un servicio</option>
          {servicios.map((s) => (
            <option key={s.id} value={s.id}>{s.nombre}</option>
          ))}
        </select>
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

export default AgregarReserva;