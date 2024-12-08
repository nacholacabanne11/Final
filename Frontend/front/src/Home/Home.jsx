import React from "react";
import "./Home.css";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <h2>Gestionar Canchas</h2>
        <input
          type="submit"
          value="crear cancha"
          onClick={() => navigate(`/crear_cancha`)}
          className="btn btn-create"
        />
        <input
          type="submit"
          value="editar cancha"
          onClick={() => navigate(`/editar_cancha`)}
          className="btn btn-edit"
        />
        <input
          type="submit"
          value="eliminar cancha"
          onClick={() => navigate(`/eliminar_cancha`)}
          className="btn btn-delete"
        />
        <input
          type="submit"
          value="Canchas"
          onClick={() => navigate(`/canchas`)}
        />
      </div>
      <div>
        <h2>Gestionar Reservas</h2>
        <input
          type="submit"
          value="crear reserva"
          onClick={() => navigate(`/crear_reserva`)}
          className="btn btn-create"
        />
        <input
          type="submit"
          value="editar reserva"
          onClick={() => navigate(`/editar_reserva`)}
          className="btn btn-edit"
        />
        <input
          type="submit"
          value="eliminar reserva"
          onClick={() => navigate(`/eliminar_reserva`)}
          className="btn btn-delete"
        />
        <input
          type="submit"
          value="ver reserva"
          onClick={() => navigate(`/ver_reserva`)}
          className="btn btn-create"
        />
      </div>
    </div>
  );
};

export default Home;
