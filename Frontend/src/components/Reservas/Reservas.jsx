import { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance.jsx";

function Reservas() {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await axiosInstance.get("/reservas");
        setReservas(response.data);
      } catch (error) {
        console.error("Error al obtener las reservas:", error);
      }
    };

    fetchReservas();
  }, []);

  return (
    <div>
      <h2>Reservas</h2>
      <ul>
        {reservas.map((reserva) => (
          <li key={reserva.id}>
            {reserva.nombre} - {reserva.fecha}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Reservas;
