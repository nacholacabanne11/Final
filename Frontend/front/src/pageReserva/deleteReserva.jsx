import React, { useState } from "react";
import axiosInstance from "../utils/axiosintance";

const DeleteReserva = () => {
  const [id, setId] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id.trim()) {
      setError("El ID de la reserva no puede estar vacío.");
      return;
    }

    try {
      const response = await axiosInstance.get(
        "http://127.0.0.1:8000/cancha/Ver_canchas"
      );
      const reservaExistente = response.data.find(
        (cancha) => cancha.id === parseInt(id)
      );

      if (!reservaExistente) {
        setError("No existe la reserva buscada.");
      } else {
        await axiosInstance.delete(
          `http://127.0.0.1:8000/reserva/Eliminar_reserva/${id}`
        );
        setError("");
        alert("reserva eliminada exitosamente.");
      }
    } catch (error) {
      console.error("Error al verificar la cancha:", error);
      setError("Hubo un problema al eliminar la cancha.");
    }
  };

  return (
    <div>
      <h2>Eliminar Cancha</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="id">ID de la reserva:</label>
          <input
            type="text"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Eliminar Cancha</button>
      </form>
    </div>
  );
};

export default DeleteReserva;
