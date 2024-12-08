import React, { useState } from "react";
import axiosInstance from "../utils/axiosintance";


const EditPage = () => {
  const [nombre, setNombre] = useState("");
  const [techada, setTechada] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre) {
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

      if (canchaExistente && canchaExistente.id !== cancha.id) {
        setError("Ya existe una cancha con ese nombre.");
      } else {
        const updatedCancha = { ...cancha, nombre, techada };
        await axiosInstance.put(
          `http://127.0.0.1:8000/cancha/Actualizar_cancha/${cancha.id}`,
          updatedCancha
        );
        onSave(updatedCancha);
        setError("");
        alert("Cancha actualizada exitosamente.");
      }
    } catch (error) {
      console.error("Error al actualizar la cancha:", error);
      setError("Hubo un problema al actualizar la cancha.");
    }
  };

  return (
    <div>
      <h2>Editar Cancha</h2>
      <form onSubmit={handleSubmit}>
        <div>
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
        <button type="submit">Actualizar Cancha</button>
      </form>
    </div>
  );
};

export default EditPage;
