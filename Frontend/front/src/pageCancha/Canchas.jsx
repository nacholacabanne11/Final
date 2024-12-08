import React, { useState, useRef, useEffect } from 'react';
import axiosInstance from '../utils/axiosintance.jsx';
import CanchaContainer from '../Components/conteiners/CanchaContainer.jsx';

const Canchas = () => {
    const [canchas, setCanchas] = useState([]);
    const createDialogRef = useRef(null);
    const editDialogRef = useRef(null);

    useEffect(() => {
        const fetchCanchas = async () => {
            try {
                const response = await axiosInstance.get(
                    "http://127.0.0.1:8000/cancha/Ver_canchas"
                );
                setCanchas(response.data);
            } catch (error) {
                console.error("Error al obtener las canchas:", error);
            }
        };

        fetchCanchas();
    }, []); // El array vacío [] asegura que el efecto se ejecute solo una vez al montar el componente

    return (
        <div>
            <h1>Lista de Canchas</h1>
            <CanchaContainer cancha={canchas} />
        </div>
    );
}

export default Canchas;
