import { useState, useEffect } from "react";
import { Box, Button, Table } from "@chakra-ui/react";
import axiosInstance from "../../utils/axiosInstance.jsx";

function Reservas() {
  const [reservas, setReservas] = useState([]);
  const [canchas, setCanchas] = useState([]);

  useEffect(() => {
    const fetchCanchas = async () => {
      try {
        const response = await axiosInstance.get(
          "http://127.0.0.1:8000/cancha/Ver_canchas"
        );
        setCanchas(response.data);
      } catch (error) {
        console.error("Error al obtener las canchas:", error);
      }
    };

    fetchCanchas();
  }, []);

  const getNombreCancha = (canchaId) => {
    const cancha = canchas.find((c) => c.id === canchaId);
    return cancha ? cancha.nombre : "Desconocido";
  };

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await axiosInstance.get(
          "http://127.0.0.1:8000/reserva/Ver_reservas"
        );
        setReservas(response.data);
      } catch (error) {
        console.error("Error al obtener las reservas:", error);
      }
    };

    fetchReservas();
  }, []);

  const handleCreate = async () => {
    try {
      const nuevaCancha = {
        nombre: "Nueva Cancha",
        techada: false,
      };
      const response = await axiosInstance.post(
        "http://127.0.0.1:8000/cancha/Crear_cancha",
        nuevaCancha
      );

      setReservas((prevCanchas) => [...prevCanchas, response.data]);

      console.log("Cancha creada y agregada a la lista");
    } catch (error) {
      console.error("Error al crear la cancha:", error);
    }
  };

  const handleEdit = (id) => {
    console.log("Editar cancha con ID:", id);
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(
        "http://127.0.0.1:8000/cancha/Eliminar_cancha/${id}"
      );

      setReservas((prevReservas) =>
        prevReservas.filter((reserva) => reserva.id !== id)
      );

      console.log("Reserva con ID ${id} eliminada correctamente");
    } catch (error) {
      console.error("Error al eliminar la cancha:", error);
    }
  };
  return (
    <div>
      <Box p={4}>
        <Button colorScheme="teal" onClick={handleCreate} mb={4}>
          Crear Cancha
        </Button>

        <Table.Root size="sm" interactive>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Nombre</Table.ColumnHeader>
              <Table.ColumnHeader>Fecha</Table.ColumnHeader>
              <Table.ColumnHeader>Hora</Table.ColumnHeader>
              <Table.ColumnHeader>Duracion</Table.ColumnHeader>
              <Table.ColumnHeader>Telefono</Table.ColumnHeader>
              <Table.ColumnHeader>Cancha</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">
                Acciones
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {reservas.map((reserva) => (
              <Table.Row key={reserva.id}>
                <Table.Cell>{reserva.nombre_contacto}</Table.Cell>
                <Table.Cell>{reserva.dia}</Table.Cell>
                <Table.Cell>{reserva.hora.slice(0, 5)}</Table.Cell>
                <Table.Cell>{reserva.duracion}</Table.Cell>
                <Table.Cell>{reserva.telefono}</Table.Cell>
                <Table.Cell>{getNombreCancha(reserva.cancha_id)}</Table.Cell>
                <Table.Cell textAlign="center">
                  <Button
                    colorScheme="blue"
                    size="sm"
                    onClick={() => handleEdit(reserva.id)}
                  >
                    Editar
                  </Button>
                  <Button
                    colorScheme="red"
                    size="sm"
                    onClick={() => handleDelete(reserva.id)}
                    ml={2}
                  >
                    Eliminar
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
      );
    </div>
  );
}

export default Reservas;
