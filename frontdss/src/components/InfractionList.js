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
        <div className="driver-list-container">
            <h2>Lista de Infracciones</h2>
            <button onClick={() => navigate('/create-infraction')}>Agregar Infracción</button>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID Infracción</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {infractions.map(infraction => (
                            <tr key={infraction.infracctionId}>
                                <td>
                                    <Link to={`/infractions/${infraction.infracctionId}`}>{infraction.infracctionId}</Link>
                                </td>
                                <td>{infraction.driver.driverName}</td>
                                <td>{infraction.recordedSpeed}</td>
                                <td className="table-actions">
                                    <button onClick={() => handleEdit(infraction.infracctionId)}>Actualizar</button>
                                    <button onClick={() => handleDelete(infraction.infracctionId)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InfractionList;
