import {
  Box,
  Button,
  Table,
  DialogContent,
  DialogHeader,
  DialogBody,
  Input,
  Stack,
  Separator,
} from "@chakra-ui/react";
import {
  NativeSelectField,
  NativeSelectRoot,
} from "@/components/ui/native-select";
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
  const [filtroFecha, setFiltroFecha] = useState("");
  const [filtroCancha, setFiltroCancha] = useState("");
  const createDialogRef = useRef(null);
  const editDialogRef = useRef(null);

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

  useEffect(() => {
    fetchData();
  }, []);

  const getCanchaNombre = (idCancha) => {
    const cancha = canchas.find((cancha) => cancha.id === idCancha);
    return cancha ? cancha.nombre : "Desconocida";
  };

  const handleFiltrarReservas = async () => {
    if (!filtroFecha || !filtroCancha) {
      alert("Por favor, selecciona tanto una fecha como una cancha.");
      return;
    }

    try {
      const response = await axiosInstance.get(
        `http://127.0.0.1:8000/reserva/Filtrar_reserva/${filtroCancha}/${filtroFecha}`
      );
      setReservas(response.data);
    } catch (error) {
      console.error("Error al filtrar las reservas:", error);
      setReservas([]);
    }
  };

  const handleQuitarFiltro = () => {
    setFiltroFecha("");
    setFiltroCancha("");
    fetchData();
  };

  const handleCreate = async (nuevaReserva) => {
    try {
      const response = await axiosInstance.post(
        "http://127.0.0.1:8000/reserva/Crear_reserva",
        nuevaReserva
      );
      setReservas((prevReservas) => [...prevReservas, response.data]);
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
      setReservas((prevReservas) =>
        prevReservas.filter((reserva) => reserva.id !== id)
      );
    } catch (error) {
      console.error("Error al eliminar la reserva:", error);
    }
  };

  return (
    <Box p={4}>
      <Stack direction="row" spacing={4} align="center" mb={4}>
        <Box borderWidth={1} borderRadius="md" p={4} w="full">
          <Stack spacing={4}>
            <Input
              type="date"
              value={filtroFecha}
              onChange={(e) => setFiltroFecha(e.target.value)}
              placeholder="Selecciona una fecha"
            />
            <NativeSelectRoot>
              <NativeSelectField
                value={filtroCancha}
                onChange={(e) => setFiltroCancha(e.target.value)}
              >
                <option value="">Selecciona una cancha</option>
                {canchas.map((cancha) => (
                  <option key={cancha.id} value={cancha.id}>
                    {cancha.nombre}
                  </option>
                ))}
              </NativeSelectField>
            </NativeSelectRoot>
            <Stack direction="row" spacing={4}>
              <Button colorScheme="blue" onClick={handleFiltrarReservas}>
                Filtrar Reservas
              </Button>
              <Button colorScheme="gray" onClick={handleQuitarFiltro}>
                Quitar Filtro
              </Button>
            </Stack>
          </Stack>
        </Box>

        <Button colorScheme="teal" onClick={() => setIsOpen(true)}>
          Crear Reserva
        </Button>
      </Stack>

      <Separator mb={4} borderColor="gray.300" />

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

      {isOpen && (
        <DialogRoot
          open={isOpen}
          onOpenChange={setIsOpen}
          placement="center"
          motionPreset="slide-in-bottom"
        >
          <DialogContent
            ref={createDialogRef}
            position="fixed"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            maxWidth="400px"
            zIndex="1000"
            bg="white"
            boxShadow="lg"
          >
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
