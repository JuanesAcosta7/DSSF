import React, { useEffect, useState } from 'react';
import { GetAllDrivers, DeleteDriver } from '../Service/DriverService.js';
import { Link, useNavigate } from 'react-router-dom';

const DriverList = () => {
    const [drivers, setDrivers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const data = await GetAllDrivers();
                setDrivers(data);
            } catch (error) {
                console.error("Error fetching drivers:", error);
            }
        };
        fetchDrivers();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este conductor?");
        if (confirmDelete) {
            const result = await DeleteDriver(id);
            if (result) {
                setDrivers(drivers.filter(driver => driver.driverId !== id));
            } else {
                alert("Error al eliminar el conductor");
            }
        }
    };

    const handleEdit = (id) => {
        navigate(`/update-driver/${id}`);
    };

    return (
        <div className="driver-list-container">
            <h2>Lista de Conductores</h2>
            <button onClick={() => navigate('/create-driver')}>Agregar Conductor</button>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Nombre del Conductor</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {drivers.map(driver => (
                            <tr key={driver.driverId}>
                                <td>
                                    <Link to={`/drivers/${driver.driverId}`}>{driver.driverName}</Link>
                                </td>
                                <td className="table-actions">
                                    <button onClick={() => handleEdit(driver.driverId)}>Actualizar</button>
                                    <button onClick={() => handleDelete(driver.driverId)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DriverList;
