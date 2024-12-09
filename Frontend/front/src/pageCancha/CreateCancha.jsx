import React, { useState } from "react";
import axiosInstance from "../utils/axiosintance.jsx";

const CrearCancha = () => {
  const [nombre, setNombre] = useState("");
  const [techada, setTechada] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre.trim()) {
      setError("El nombre de la cancha no puede estar vacío.");
      return;
    }

    try {
      const response = await axiosInstance.get(
        "http://127.0.0.1:8000/cancha/Ver_canchas"
      );
      const canchaExistente = response.data.find(
        (cancha) => cancha.nombre.toLowerCase() === nombre.toLowerCase()
      );

      if (canchaExistente) {
        setError("Ya existe una cancha con ese nombre.");
      } else {
        const nuevaCancha = { nombre, techada };
        await axiosInstance.post(
          "http://127.0.0.1:8000/cancha/Crear_cancha",
          nuevaCancha
        );
        setNombre("");
        setTechada(false);
      }
    } catch (error) {
      console.error("Error al verificar la cancha:", error);
      setError("Hubo un problema al crear la cancha.");
    }
  };

  return (
    <form onSubmit={handleSubmit} id="logg">
      <div >
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="techada">Techada:</label>
        <input
          type="checkbox"
          id="techada"
          checked={techada}
          onChange={(e) => setTechada(e.target.checked)}
        />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Crear Cancha</button>
    </form>
  );
};

export default CrearCancha;
