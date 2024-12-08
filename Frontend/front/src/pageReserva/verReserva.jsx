import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosintance';


const VerReserva = () => {
    const [reservas, setReservas] = useState([]);
    const [canchas, setCanchas] = useState([]);
    const [filtroFecha, setFiltroFecha] = useState("");
    const [filtroCancha, setFiltroCancha] = useState("");
    const [error, setError] = useState("");

    const fetchData = async () => {
        try {
            const [reservasResponse, canchasResponse] = await Promise.all([
                axiosInstance.get("http://127.0.0.1:8000/reserva/Ver_reservas"),
                axiosInstance.get("http://127.0.0.1:8000/cancha/Ver_canchas"),
            ]);

            setReservas(reservasResponse.data);
            setCanchas(canchasResponse.data);
        } catch (error) {
            console.error("Error al obtener los datos:", error);
            setError("Hubo un problema al obtener los datos.");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleFiltrar = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.get(
                `http://127.0.0.1:8000/reserva/Filtrar_reserva/${filtroCancha}/${filtroFecha}`
            );
            setReservas(response.data);
        } catch (error) {
            console.error("Error al filtrar las reservas:", error);
            setReservas([]);
            setError("Hubo un problema al filtrar las reservas.");
        }
    };

    const handleQuitarFiltro = () => {
        setFiltroFecha("");
        setFiltroCancha("");
        fetchData();
    };

    return (
        <div>
            <h2>Ver Reservas</h2>
            <form onSubmit={handleFiltrar}>
                <div>
                    <label htmlFor="filtroFecha">Fecha:</label>
                    <input
                        type="date"
                        id="filtroFecha"
                        value={filtroFecha}
                        onChange={(e) => setFiltroFecha(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="filtroCancha">Cancha:</label>
                    <select
                        id="filtroCancha"
                        value={filtroCancha}
                        onChange={(e) => setFiltroCancha(e.target.value)}
                    >
                        <option value="">Seleccione una cancha</option>
                        {canchas.map((cancha) => (
                            <option key={cancha.id} value={cancha.id}>
                                {cancha.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Filtrar</button>
                <button type="button" onClick={handleQuitarFiltro}>Quitar Filtro</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                <h3>Lista de Reservas</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Duración</th>
                            <th>Teléfono</th>
                            <th>Nombre de Contacto</th>
                            <th>Cancha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservas.map((reserva) => (
                            <tr key={reserva.id}>
                                <td>{reserva.dia}</td>
                                <td>{reserva.hora}</td>
                                <td>{reserva.duracion} minutos</td>
                                <td>{reserva.telefono}</td>
                                <td>{reserva.nombre_contacto}</td>
                                <td>{canchas.find(c => c.id === reserva.cancha_id)?.nombre || "N/A"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default VerReserva;
