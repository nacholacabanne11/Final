import { useState, useEffect } from "react";
import { Box, Button, Table } from "@chakra-ui/react";
import axiosInstance from "../../utils/axiosInstance.jsx";

const Canchas = () => {
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

  const handleCreate = () => {
    console.log("Crear cancha");
  };

  const handleEdit = (id) => {
    console.log("Editar cancha con ID:", id);
  };

  const handleDelete = (id) => {
    console.log("Eliminar cancha con ID:", id);
  };

  return (
    <Box p={4}>
      <Button colorScheme="teal" onClick={handleCreate} mb={4}>
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
                  onClick={() => handleEdit(cancha.id)}
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
    </Box>
  );
};

export default Canchas;
