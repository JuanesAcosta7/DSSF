import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GetVehicleById } from '../Service/VehicleService.js'; 

const VehicleDetail = () => {
    const { id } = useParams();
    const [vehicle, setVehicle] = useState(null);

    useEffect(() => {
        const fetchVehicle = async () => {
            const result = await GetVehicleById(id);
            setVehicle(result);
        };
        fetchVehicle();
    }, [id]);

    if (!vehicle) return <div>Cargando...</div>;

    return (
        <div>
            <h2>Detalles del Vehículo</h2>
            <p>Placa: {vehicle.vehiclePlate}</p>
            <p>Modelo: {vehicle.vehicleModel}</p>
            <p>Año: {vehicle.vehicleYear}</p>
            <p>Modificado por: {vehicle.modifiedBy}</p>
        </div>
    );
};

export default VehicleDetail;
