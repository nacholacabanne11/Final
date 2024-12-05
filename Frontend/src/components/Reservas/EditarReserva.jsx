import { useState, useEffect } from "react";
import { Input, Button, Stack } from "@chakra-ui/react";
import {
  NativeSelectField,
  NativeSelectRoot,
} from "@/components/ui/native-select";
import { Alert } from "@/components/ui/alert";
import axiosInstance from "../../utils/axiosInstance";

function EditarReserva({ reserva, onSave }) {
  const [dia, setDia] = useState(reserva.dia || "");
  const [hora, setHora] = useState(reserva.hora || "");
  const [duracion, setDuracion] = useState(reserva.duracion || "");
  const [telefono, setTelefono] = useState(reserva.telefono || "");
  const [nombreContacto, setNombreContacto] = useState(
    reserva.nombre_contacto || ""
  );
  const [canchaId, setCanchaId] = useState(reserva.cancha_id || "");
  const [canchas, setCanchas] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCanchas = async () => {
      try {
        const response = await axiosInstance.get(
          "http://127.0.0.1:8000/cancha/Ver_canchas"
        );
        setCanchas(response.data);
      } catch (error) {
        console.error("Error al obtener las canchas:", error);
        setError("Hubo un problema al cargar las canchas.");
      }
    };

    fetchCanchas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !dia ||
      !hora ||
      !duracion ||
      !telefono.trim() ||
      !nombreContacto.trim() ||
      !canchaId
    ) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    const reservaActualizada = {
      dia,
      hora,
      duracion: parseInt(duracion, 10),
      telefono,
      nombre_contacto: nombreContacto,
      cancha_id: parseInt(canchaId, 10),
    };

    try {
      const response = await axiosInstance.put(
        `http://127.0.0.1:8000/reserva/Actualizar_reserva/${reserva.id}`,
        reservaActualizada
      );

      onSave(response.data);
      setError("");
    } catch (error) {
      console.error("Error al actualizar la reserva:", error);
      if (error.response?.status === 400) {
        setError(
          "La reserva ya existe para la cancha, día y hora especificados."
        );
      } else {
        setError("Hubo un problema al actualizar la reserva.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={4}>
        {error && <Alert status="error" title={error} />}
        <Input
          type="date"
          value={dia}
          onChange={(e) => setDia(e.target.value)}
          placeholder="Día"
        />
        <Input
          type="time"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
          placeholder="Hora"
        />
        <Input
          type="number"
          value={duracion}
          onChange={(e) => setDuracion(e.target.value)}
          placeholder="Duración (minutos)"
        />
        <Input
          type="text"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          placeholder="Teléfono"
        />
        <Input
          type="text"
          value={nombreContacto}
          onChange={(e) => setNombreContacto(e.target.value)}
          placeholder="Nombre de contacto"
        />
        <NativeSelectRoot>
          <NativeSelectField
            value={canchaId}
            onChange={(e) => setCanchaId(e.target.value)}
          >
            <option value="" disabled>
              Selecciona una cancha
            </option>
            {canchas.map((cancha) => (
              <option key={cancha.id} value={cancha.id}>
                {cancha.nombre}
              </option>
            ))}
          </NativeSelectField>
        </NativeSelectRoot>
        <Button type="submit" colorScheme="teal">
          Guardar Cambios
        </Button>
      </Stack>
    </form>
  );
}

export default EditarReserva;
