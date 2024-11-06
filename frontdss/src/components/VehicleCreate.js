import React, { useState, useEffect } from 'react';
import { CreateVehicle } from '../Service/VehicleService.js';
import { GetAllDrivers } from '../Service/DriverService.js';
import { useNavigate } from 'react-router-dom';

const CreateVehicleForm = () => {
    const [VehiclePlate, setVehiclePlate] = useState('');
    const [VehicleModel, setVehicleModel] = useState('');
    const [VehicleYear, setVehicleYear] = useState('');
    const [modifiedBy, setModifiedBy] = useState('');
    const [DriverId, setDriverId] = useState('');
    const [drivers, setDrivers] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    // Cargar el ID del usuario desde localStorage y los conductores desde el backend
    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const driverList = await GetAllDrivers();
                setDrivers(driverList); // Guardamos los conductores en el estado
            } catch (error) {
                setErrorMessage("No se pudieron cargar los conductores");
            }
        };

        const userIdFromStorage = localStorage.getItem('userId');
        if (userIdFromStorage) {
            setModifiedBy(userIdFromStorage); // Asignamos el userId al campo "modificado por"
        }

        fetchDrivers();
    }, []); // Solo se ejecuta una vez cuando el componente se monta

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        const newVehicle = {
            VehiclePlate,
            VehicleModel,
            VehicleYear: parseInt(VehicleYear, 10),
            Driver: { DriverId },
            modified: new Date().toISOString(),
            modifiedBy, // Usamos el userId en el campo modifiedBy
        };

        try {
            await CreateVehicle(newVehicle);
            alert("Vehículo creado exitosamente");
            setVehiclePlate('');
            setVehicleModel('');
            setVehicleYear('');
            setModifiedBy('');
            setDriverId('');
            navigate('/vehicles');
        } catch (error) {
            setErrorMessage("Error al crear el vehículo");
        }
    };

    return (
        <div className="create-user-container">
            <div className="create-user-box">
                <h2>Crear Vehículo</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Placa del Vehículo:</label>
                        <input
                            type="text"
                            value={VehiclePlate}
                            onChange={(e) => setVehiclePlate(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Modelo del Vehículo:</label>
                        <input
                            type="text"
                            value={VehicleModel}
                            onChange={(e) => setVehicleModel(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Año del Vehículo:</label>
                        <input
                            type="number"
                            value={VehicleYear}
                            onChange={(e) => setVehicleYear(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Conductor:</label>
                        <select
                            value={DriverId}
                            onChange={(e) => setDriverId(e.target.value)}
                            required
                        >
                            <option value="">Seleccione un conductor</option>
                            {drivers.map((driver) => (
                                <option key={driver.DriverId} value={driver.DriverId}>
                                    {driver.DriverName}
                                </option>
                            ))}
                        </select>
                    </div>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <button type="submit">Crear Vehículo</button>
                </form>
            </div>
        </div>
    );
};

export default CreateVehicleForm;

