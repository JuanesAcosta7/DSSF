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
                console.error("Error fetching vehicles:", error);
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
        <div>
            <h2>Lista de Veh�culos</h2>
            <button onClick={() => navigate('/create-vehicle')}>Agregar Veh�culo</button> 
            <ul>
                {vehicles.map(vehicle => (
                    <li key={vehicle.vehicleId}>
                        <Link to={`/vehicles/${vehicle.vehicleId}`}>{vehicle.vehiclePlate} - {vehicle.vehicleModel}</Link> 
                        <button onClick={() => handleEdit(vehicle.vehicleId)}>Actualizar</button>
                        <button onClick={() => handleDelete(vehicle.vehicleId)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VehicleList;
