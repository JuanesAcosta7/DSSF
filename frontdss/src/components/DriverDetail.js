import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GetDriverById } from '../Service/DriverService.js'; // Aseg�rate de tener esta funci�n

const DriverDetail = () => {
    const { id } = useParams();
    const [driver, setDriver] = useState(null);

    useEffect(() => {
        const fetchDriver = async () => {
            const result = await GetDriverById(id);
            setDriver(result);
        };
        fetchDriver();
    }, [id]);

    if (!driver) return <div>Cargando...</div>;

    return (
        <div>
            <h2>Detalles del Conductor</h2>
            <p>Nombre: {driver.driverName}</p>
            <p>N�mero de Licencia: {driver.licenseNumber}</p>
            <p>Tel�fono: {driver.phone}</p>
            <p>Modificado por: {driver.modifiedBy}</p>
            {/* Otros detalles que desees mostrar */}
        </div>
    );
};

export default DriverDetail;