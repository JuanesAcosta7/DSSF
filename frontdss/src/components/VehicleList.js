import React, { useEffect, useState } from 'react';
import { GetAllVehicles, DeleteVehicle } from '../Service/VehicleService.js';
import { Link, useNavigate } from 'react-router-dom';

const VehicleList = () => {
    const [vehicles, setVehicles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const data = await GetAllVehicles();
                console.log("Datos de la API de veh�culos:", data);
                setVehicles(data);
            } catch (error) {
                console.error("Error obteniendo veh�culos:", error);
            }
        };
        fetchVehicles();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("�Est�s seguro de que deseas eliminar este veh�culo?");
        if (confirmDelete) {
            const result = await DeleteVehicle(id);
            if (result) {
                setVehicles(vehicles.filter(vehicle => vehicle.vehicleId !== id));
            } else {
                alert("Error al eliminar el veh�culo");
            }
        }
    };

    const handleEdit = (id) => {
        navigate(`/update-vehicle/${id}`);
    };

    return (
        <div className="vehicle-list-container">
            <h2>Lista de Veh�culos</h2>
            <button onClick={() => navigate('/create-vehicle')} className="add-button">Agregar Veh�culo</button>
            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Placa del Veh�culo</th>
                            <th>Modelo del Veh�culo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicles.map(vehicle => (
                            <tr key={vehicle.vehicleId}>
                                <td>
                                    <Link to={`/vehicles/${vehicle.vehicleId}`} className="table-link">
                                        {vehicle.vehiclePlate}
                                    </Link>
                                </td>
                                <td>{vehicle.vehicleModel}</td>
                                <td className="table-actions">
                                    <button onClick={() => handleEdit(vehicle.vehicleId)} className="update-button">Actualizar</button>
                                    <button onClick={() => handleDelete(vehicle.vehicleId)} className="delete-button">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default VehicleList;
