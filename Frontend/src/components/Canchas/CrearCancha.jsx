import { useState } from "react";
import { Input, Button, Stack } from "@chakra-ui/react";
import {
  NativeSelectField,
  NativeSelectRoot,
} from "@/components/ui/native-select";
import { Alert } from "@/components/ui/alert";
import axiosInstance from "../../utils/axiosInstance";
import { Text } from "@chakra-ui/react";

function CrearCancha({ onCreate }) {
  const [nombre, setNombre] = useState("");
  const [techada, setTechada] = useState(false);
  const [error, setError] = useState("");

  const handleSelectChange = (e) => {
    const value = e.target.value === "True";
    setTechada(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre.trim()) {
      setError("El nombre de la cancha no puede estar vacío.");
      return;
    }

    try {
      const response = await axiosInstance.get(
        `http://127.0.0.1:8000/cancha/Ver_canchas`
      );
      const canchaExistente = response.data.find(
        (cancha) => cancha.nombre.toLowerCase() === nombre.toLowerCase()
      );

      if (canchaExistente) {
        setError("Ya existe una cancha con ese nombre.");
      } else {
        const nuevaCancha = { nombre, techada };
        onCreate(nuevaCancha);
        setNombre("");
        setTechada(false);
        setError("");
      }
    } catch (error) {
      console.error("Error al verificar la cancha:", error);
      setError("Hubo un problema al verificar el nombre de la cancha.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={4}>
        {error && <Alert status="error" title={error} />}
        <Input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre de la cancha"
        />

        <Text>Techada </Text>

        <NativeSelectRoot>
          <NativeSelectField
            value={techada ? "True" : "False"}
            onChange={handleSelectChange}
          >
            <option value="True">Sí</option>
            <option value="False">No</option>
          </NativeSelectField>
        </NativeSelectRoot>
        <Button type="submit" colorScheme="teal">
          Crear Cancha
        </Button>
      </Stack>
    </form>
  );
}

export default CrearCancha;
