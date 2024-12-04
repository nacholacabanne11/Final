import { useState, useEffect, useRef } from "react";
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
import CrearCancha from "./CrearCancha";
import EditarCancha from "./EditarCancha";

const Canchas = () => {
  const [canchas, setCanchas] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [canchaSeleccionada, setCanchaSeleccionada] = useState(null);
  const createDialogRef = useRef(null);
  const editDialogRef = useRef(null);

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

  const handleCreate = async (nuevaCancha) => {
    try {
      const response = await axiosInstance.post(
        "http://127.0.0.1:8000/cancha/Crear_cancha",
        nuevaCancha
      );
      setCanchas((prevCanchas) => [...prevCanchas, response.data]);
    } catch (error) {
      console.error("Error al crear la cancha:", error);
    }
  };

  const handleEditOpen = (cancha) => {
    setCanchaSeleccionada(cancha);
    setIsEditOpen(true);
  };

  const handleSave = (canchaActualizada) => {
    setCanchas((prevCanchas) =>
      prevCanchas.map((cancha) =>
        cancha.id === canchaActualizada.id ? canchaActualizada : cancha
      )
    );
    setIsEditOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(
        `http://127.0.0.1:8000/cancha/Eliminar_cancha/${id}`
      );
      setCanchas((prevCanchas) =>
        prevCanchas.filter((cancha) => cancha.id !== id)
      );
    } catch (error) {
      console.error("Error al eliminar la cancha:", error);
    }
  };

  return (
    <Box p={4}>
      <Button colorScheme="teal" onClick={() => setIsOpen(true)} mb={4}>
        Crear Cancha
      </Button>

      <Table.Root size="sm" interactive>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Nombre</Table.ColumnHeader>
            <Table.ColumnHeader>Techado</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center">Acciones</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {canchas.map((cancha) => (
            <Table.Row key={cancha.id}>
              <Table.Cell>{cancha.nombre}</Table.Cell>
              <Table.Cell>
                {cancha.techada ? "Es techada" : "No es techada"}
              </Table.Cell>
              <Table.Cell textAlign="center">
                <Button
                  colorScheme="blue"
                  size="sm"
                  onClick={() => handleEditOpen(cancha)}
                >
                  Editar
                </Button>
                <Button
                  colorScheme="red"
                  size="sm"
                  onClick={() => handleDelete(cancha.id)}
                  ml={2}
                >
                  Eliminar
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      {/* Dialog para Crear Cancha */}
      {isOpen && (
        <DialogRoot
          open={isOpen}
          onOpenChange={setIsOpen}
          placement="center"
          motionPreset="slide-in-bottom"
        >
          <DialogContent ref={createDialogRef}>
            <DialogHeader>
              Crear Cancha
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
              <CrearCancha onCreate={handleCreate} />
            </DialogBody>
          </DialogContent>
        </DialogRoot>
      )}

      {/* Dialog para Editar Cancha */}
      {isEditOpen && (
        <DialogRoot
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
          placement="center"
          motionPreset="slide-in-bottom"
        >
          <DialogContent ref={editDialogRef}>
            <DialogHeader>
              Editar Cancha
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
              <EditarCancha cancha={canchaSeleccionada} onSave={handleSave} />
            </DialogBody>
          </DialogContent>
        </DialogRoot>
      )}
    </Box>
  );
};

export default Canchas;
