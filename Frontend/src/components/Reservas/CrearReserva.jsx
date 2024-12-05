import { useState, useEffect } from "react";
import { Input, Button, Stack } from "@chakra-ui/react";
import {
  NativeSelectField,
  NativeSelectRoot,
} from "@/components/ui/native-select";
import { Alert } from "@/components/ui/alert";
import axiosInstance from "../../utils/axiosInstance";

function CrearReserva({ onCreate }) {
  const [dia, setDia] = useState("");
  const [hora, setHora] = useState("");
  const [duracion, setDuracion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [nombreContacto, setNombreContacto] = useState("");
  const [idCancha, setIdCancha] = useState("");
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
      !idCancha
    ) {
      setError("Todos los campos son obligatorios.");
      console.error("Error de validación: Campos obligatorios faltantes.");
      return;
    }

    const nuevaReserva = {
      dia,
      hora,
      duracion: parseInt(duracion, 10),
      telefono,
      nombre_contacto: nombreContacto,
      cancha_id: parseInt(idCancha, 10),
    };

    try {
      console.log("Enviando datos:", nuevaReserva);
      await onCreate(nuevaReserva);
      setDia("");
      setHora("");
      setDuracion("");
      setTelefono("");
      setNombreContacto("");
      setIdCancha("");
      setError("");
    } catch (error) {
      console.error("Error en handleSubmit:", error);
      if (error.response?.status === 400) {
        setError("Ya hay una reserva en ese horario.");
      } else {
        setError("Hubo un problema al crear la reserva.");
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
          placeholder="Duración (en minutos)"
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
            value={idCancha}
            onChange={(e) => setIdCancha(e.target.value)}
            placeholder="Selecciona una cancha"
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
          Crear Reserva
        </Button>
      </Stack>
    </form>
  );
}

export default CrearReserva;
