import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GetDriverById, UpdateDriver } from '../Service/DriverService.js';

const UpdateDriverForm = () => {
    const { Id } = useParams();
    console.log("Driver ID:", Id); // Verifica que obtengas el ID correcto
    const [driver, setDriver] = useState({
        driverId: 'Id',
        driverName: '',
        licenseNumber: '',
        phone: '',
    });

    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchDriver = async () => {
            try {
                const fetchedDriver = await GetDriverById(Id);
                if (fetchedDriver) {
                    setDriver(fetchedDriver);
                }
            } catch (error) {
                console.error("Error fetching driver by id", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDriver();
    }, [Id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDriver({ ...driver, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedDriver = {
            ...driver,
            modified: new Date().toISOString(),
            modifiedBy: 'tuNombreUsuario'
        };

        try {
            const result = await UpdateDriver(Id, updatedDriver);
            if (result) {
                setMessage('Conductor actualizado con éxito');
            } else {
                setMessage('Error actualizando el conductor');
            }
        } catch (error) {
            setMessage('Error al actualizar el conductor');
        }
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <h2>Actualizar Conductor</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre del Conductor</label>
                    <input
                        type="text"
                        name="driverName"
                        value={driver.driverName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Número de Licencia</label>
                    <input
                        type="text"
                        name="licenseNumber"
                        value={driver.licenseNumber}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Teléfono</label>
                    <input
                        type="text"
                        name="phone"
                        value={driver.phone}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit">Actualizar</button>
            </form>
        </div>
    );
};

export default UpdateDriverForm;

