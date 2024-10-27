import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GetInfractionById } from '../Service/InfractionService.js'; 
const InfractionDetail = () => {
    const { id } = useParams(); 
    const [infraction, setInfraction] = useState(null); 

    useEffect(() => {
        const fetchInfraction = async () => {
            const result = await GetInfractionById(id); 
            setInfraction(result); 
        };
        fetchInfraction();
    }, [id]); 

    if (!infraction) return <div>Cargando...</div>;

    return (
        <div>
            <h2>Detalles de la Infracci�n</h2>
            <p>ID de la Infracci�n: {infraction.infracctionId}</p>
            <p>Fecha: {infraction.date}</p>
            <p>Ubicaci�n: {infraction.ubication}</p>
            <p>Velocidad Registrada: {infraction.recordedSpeed} km/h</p>
            <p>Velocidad L�mite: {infraction.limitedSpeed} km/h</p>
            <p>Estado de Pago: {infraction.paymentStatus}</p>
            <p>Conductor: {infraction.driver.driverName}</p>
            <p>Veh�culo: {infraction.vehicle.vehiclePlate}</p> 
            <p>Modificado por: {infraction.modifiedBy}</p>
        </div>
    );
};

export default InfractionDetail;
