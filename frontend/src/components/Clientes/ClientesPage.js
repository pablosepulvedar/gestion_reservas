import { useEffect, useState } from "react";
import api from "../../api/api";
import ListaClientes from "./ListaClientes";
import AgregarCliente from "./AgregarCliente";

function ClientesPage() {
  const [clientes, setClientes] = useState([]);

  // Cargar clientes al iniciar
  useEffect(() => {
    api.get("clientes/")
      .then((res) => setClientes(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Función para agregar cliente al estado
  const agregarCliente = (nuevoCliente) => {
    setClientes([...clientes, nuevoCliente]);
  };

  const eliminarCliente = (id) => {
    api.delete(`clientes/${id}/`)
      .then(() => {
        setClientes(clientes.filter(c => c.id !== id));
      })
      .catch((err) => console.error(err));
  };

  const editarCliente = (clienteEditado) => {
    api.put(`clientes/${clienteEditado.id}/`, clienteEditado)
      .then((res) => {
        setClientes(clientes.map(c => 
          c.id === clienteEditado.id ? res.data : c
        ));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Gestión de Clientes</h1>

      {/* Formulario Agregar Cliente */}
      <div className="mb-4 p-3 border rounded shadow-sm bg-light">
        <AgregarCliente onClienteAgregado={agregarCliente} />
      </div>

      {/* Lista de Clientes */}
      <div className="table-responsive">
        <ListaClientes
          clientes={clientes}
          onEliminar={eliminarCliente}
          onEditar={editarCliente}
        />
      </div>
    </div>
  );
}

export default ClientesPage;