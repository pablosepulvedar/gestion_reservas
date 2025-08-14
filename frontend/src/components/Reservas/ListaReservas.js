import { useState } from "react";

function ListaReservas({ reservas, clientes, servicios, onEliminar, onEditar }) {
  const [editando, setEditando] = useState(null);
  const [formData, setFormData] = useState({
    fecha: "",
    hora: "",
    cliente: "",
    servicio: ""
  });

  const startEdit = (reserva) => {
    setEditando(reserva.id);
    setFormData({
      id: reserva.id,
      fecha: reserva.fecha,
      hora: reserva.hora,
      cliente: reserva.cliente.id,
      servicio: reserva.servicio.id,
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
    <div>
      <h2>Reservas</h2>
      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Cliente</th>
              <th>Servicio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((r) => (
              <tr key={r.id}>
                {editando === r.id ? (
                  <>
                    <td style={{ minWidth: "0" }}>
                      <input
                        className="form-control form-control-sm"
                        style={{ maxWidth: "120px" }}
                        name="fecha"
                        type="date"
                        value={formData.fecha}
                        onChange={handleChange}
                      />
                    </td>
                    <td style={{ minWidth: "0" }}>
                      <input
                        className="form-control form-control-sm"
                        style={{ maxWidth: "90px" }}
                        name="hora"
                        type="time"
                        value={formData.hora}
                        onChange={handleChange}
                      />
                    </td>
                    <td style={{ minWidth: "0" }}>
                      <select
                        className="form-select form-select-sm"
                        style={{ maxWidth: "180px" }}
                        name="cliente"
                        value={formData.cliente}
                        onChange={handleChange}
                      >
                        {clientes.length > 0 ? (
                          clientes.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)
                        ) : (
                          <option disabled>Cargando clientes...</option>
                        )}
                      </select>
                    </td>
                    <td style={{ minWidth: "0" }}>
                      <select
                        className="form-select form-select-sm"
                        style={{ maxWidth: "180px" }}
                        name="servicio"
                        value={formData.servicio}
                        onChange={handleChange}
                      >
                        {servicios.length > 0 ? (
                          servicios.map(s => <option key={s.id} value={s.id}>{s.nombre}</option>)
                        ) : (
                          <option disabled>Cargando servicios...</option>
                        )}
                      </select>
                    </td>
                    <td style={{ minWidth: "0" }}>
                      <div className="d-flex gap-2">
                        <button className="btn btn-success btn-sm" onClick={handleSave}>Guardar</button>
                        <button className="btn btn-secondary btn-sm" onClick={() => setEditando(null)}>Cancelar</button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{r.fecha}</td>
                    <td>{r.hora}</td>
                    <td>{r.cliente.nombre}</td>
                    <td>{r.servicio.nombre}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <button className="btn btn-primary btn-sm" onClick={() => startEdit(r)}>Editar</button>
                        <button className="btn btn-danger btn-sm" onClick={() => onEliminar(r.id)}>Eliminar</button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListaReservas;