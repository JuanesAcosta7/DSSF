import React, { useEffect, useState } from 'react';
import { GetAllInfractions, DeleteInfraction } from '../Service/InfractionService.js'; 
import { Link, useNavigate } from 'react-router-dom';

const InfractionList = () => {
    const [infractions, setInfractions] = useState([]); 
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchInfractions = async () => {
            try {
                const data = await GetAllInfractions();
                console.log("Datos de la API de infracciones:", data); 
                setInfractions(data); 
            } catch (error) {
                console.error("Error fetching infractions:", error);
            }
        };
        fetchInfractions();
    }, []); 

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta infracción?");
        if (confirmDelete) {
            const result = await DeleteInfraction(id);
            if (result) {
                setInfractions(infractions.filter(infraction => infraction.infracctionId !== id)); 
            } else {
                alert("Error al eliminar la infracción");
            }
        }
    };

    const handleEdit = (id) => {
        navigate(`/update-infraction/${id}`); 
    };

    return (
        <div>
            <h2>Lista de Infracciones</h2>
            <button onClick={() => navigate('/create-infraction')}>Agregar Infracción</button> 
            <ul>
                {infractions.map(infraction => (
                    <li key={infraction.infracctionId}>
                        <Link to={`/infractions/${infraction.infracctionId}`}>{`Infracción #${infraction.infracctionId} - ${infraction.driver.driverName}`}</Link> 
                        <button onClick={() => handleEdit(infraction.infracctionId)}>Actualizar</button>
                        <button onClick={() => handleDelete(infraction.infracctionId)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default InfractionList;
