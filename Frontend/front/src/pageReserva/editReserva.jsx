import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosintance";

const EditReserva = () => {
  const [dia, setDia] = useState("");
  const [hora, setHora] = useState("");
  const [duracion, setDuracion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [nombreContacto, setNombreContacto] = useState("");
  const [canchaId, setCanchaId] = useState("");
  const [reservaIdVieja, setReservaIdVieja] = useState([]);
  const [error, setError] = useState("");

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
    if (duracion < 60 || duracion > 180) {
      setError("La duración debe estar entre 60 y 180 minutos.");
      console.error("Error: Duración fuera de rango");
      return;
    }

    const [hour, minute] = hora.split(":").map((t) => parseInt(t, 10));
    const [year, month, day] = dia.split("-").map((t) => parseInt(t, 10));
    const selectedDate = new Date(year, month - 1, day, hour, minute);

    const currentDate = new Date();
    if (selectedDate < currentDate) {
      setError("La fecha seleccionada es anterior a la fecha y hora actuales.");
      console.error("Error: Fecha seleccionada menor que actual");
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
      axiosInstance.put(
        `http://127.0.0.1:8000/reserva/Actualizar_reserva/${reservaIdVieja}`,
        reservaActualizada
      );
      setError("");
    } catch (error) {
      console.error("Error al actualizar la reserva:", error);
      {
        setError("Hubo un problema al actualizar la reserva.");
      }
    }
  };
  return (
    <div>
      <h2>editar Reserva</h2>
      <form onSubmit={handleSubmit}id="logg">
        <div>
          <label htmlFor="id reserva">id reserva:</label>
          <input
            type="text"
            id="id reserva"
            value={reservaIdVieja}
            onChange={(e) => setReservaIdVieja(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="dia">Día:</label>
          <input
            type="date"
            id="dia"
            value={dia}
            onChange={(e) => setDia(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="hora">Hora:</label>
          <input
            type="time"
            id="hora"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="duracion">Duración (minutos):</label>
          <input
            type="number"
            id="duracion"
            value={duracion}
            onChange={(e) => setDuracion(e.target.value)}
            required
            min="60"
            max="180"
          />
        </div>
        <div>
          <label htmlFor="telefono">Teléfono:</label>
          <input
            type="tel"
            id="telefono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="nombreContacto">Nombre de Contacto:</label>
          <input
            type="text"
            id="nombreContacto"
            value={nombreContacto}
            onChange={(e) => setNombreContacto(e.target.value)}
            required
          />
        </div>
        <div>
        <label htmlFor="cancha id">Nombre de la cancha:</label>
        <input
          type="number"
          id="id cancha"
          value={canchaId}
          onChange={(e) => setCanchaId(e.target.value)}
          required
        />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">editar Reserva</button>
      </form>
    </div>
  );
};

export default EditReserva;
