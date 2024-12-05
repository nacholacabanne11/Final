import {
  Box,
  Button,
  Table,
  DialogContent,
  DialogHeader,
  DialogBody,
} from "@chakra-ui/react";
import { DialogRoot } from "@/components/ui/dialog";
import axiosInstance from "../../utils/axiosInstance.jsx";
import CrearReserva from "./CrearReserva";
import EditarReserva from "./EditarReserva";
import { useState, useEffect, useRef } from "react";

const Reservas = () => {
  const [reservas, setReservas] = useState([]);
  const [canchas, setCanchas] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [reservaSeleccionada, setReservaSeleccionada] = useState(null);
  const createDialogRef = useRef(null);
  const editDialogRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reservasResponse, canchasResponse] = await Promise.all([
          axiosInstance.get("http://127.0.0.1:8000/reserva/Ver_reservas"),
          axiosInstance.get("http://127.0.0.1:8000/cancha/Ver_canchas"),
        ]);

        setReservas(reservasResponse.data);
        setCanchas(canchasResponse.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);

  const getCanchaNombre = (idCancha) => {
    const cancha = canchas.find((cancha) => cancha.id === idCancha);
    return cancha ? cancha.nombre : "Desconocida";
  };

  const handleClickOutside = (event) => {
    if (
      isOpen &&
      createDialogRef.current &&
      !createDialogRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
    if (
      isEditOpen &&
      editDialogRef.current &&
      !editDialogRef.current.contains(event.target)
    ) {
      setIsEditOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, isEditOpen]);

  const handleCreate = async (nuevaReserva) => {
    try {
      console.log("Datos enviados:", nuevaReserva);
      const response = await axiosInstance.post(
        "http://127.0.0.1:8000/reserva/Crear_reserva",
        nuevaReserva
      );
      setReservas((prevReservas) => [...prevReservas, response.data]);
      console.log("Reserva creada con éxito:", response.data);
    } catch (error) {
      console.error("Error al crear la reserva:", error);
      throw error;
    }
  };

  const handleEditOpen = (reserva) => {
    setReservaSeleccionada(reserva);
    setIsEditOpen(true);
  };

  const handleSave = (reservaActualizada) => {
    setReservas((prevReservas) =>
      prevReservas.map((reserva) =>
        reserva.id === reservaActualizada.id ? reservaActualizada : reserva
      )
    );
    setIsEditOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(
        `http://127.0.0.1:8000/reserva/Eliminar_reserva/${id}`
      );
      console.log("Eliminando reserva con id:", id);
      setReservas((prevReservas) =>
        prevReservas.filter((reserva) => reserva.id !== id)
      );
    } catch (error) {
      console.error("Error al eliminar la reserva:", error);
    }
  };

  return (
    <Box p={4}>
      <Button colorScheme="teal" onClick={() => setIsOpen(true)} mb={4}>
        Crear Reserva
      </Button>

      <Table.Root size="sm" interactive>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Nombre</Table.ColumnHeader>
            <Table.ColumnHeader>Fecha</Table.ColumnHeader>
            <Table.ColumnHeader>Hora</Table.ColumnHeader>
            <Table.ColumnHeader>Duración</Table.ColumnHeader>
            <Table.ColumnHeader>Teléfono</Table.ColumnHeader>
            <Table.ColumnHeader>Cancha</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center">Acciones</Table.ColumnHeader>
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
              <Table.Cell>{getCanchaNombre(reserva.cancha_id)}</Table.Cell>
              <Table.Cell textAlign="center">
                <Button
                  colorScheme="blue"
                  size="sm"
                  onClick={() => handleEditOpen(reserva)}
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

      {/* Dialog para Crear Reserva */}
      {isOpen && (
        <DialogRoot
          open={isOpen}
          onOpenChange={setIsOpen}
          placement="center"
          motionPreset="slide-in-bottom"
        >
          <DialogContent ref={createDialogRef}>
            <DialogHeader>
              Crear Reserva
              <Button
                onClick={() => setIsOpen(false)}
                variant="link"
                position="absolute"
                top={2}
                right={2}
                color="gray.500"
                _hover={{ color: "black" }}
              >
                X
              </Button>
            </DialogHeader>
            <DialogBody>
              <CrearReserva onCreate={handleCreate} />
            </DialogBody>
          </DialogContent>
        </DialogRoot>
      )}

      {/* Dialog para Editar Reserva */}
      {isEditOpen && (
        <DialogRoot
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
          placement="center"
          motionPreset="slide-in-bottom"
        >
          <DialogContent ref={editDialogRef}>
            <DialogHeader>
              Editar Reserva
              <Button
                onClick={() => setIsEditOpen(false)}
                variant="link"
                position="absolute"
                top={2}
                right={2}
                color="gray.500"
                _hover={{ color: "black" }}
              >
                X
              </Button>
            </DialogHeader>
            <DialogBody>
              <EditarReserva
                reserva={reservaSeleccionada}
                onSave={handleSave}
              />
            </DialogBody>
          </DialogContent>
        </DialogRoot>
      )}
    </Box>
  );
};

export default Reservas;
