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

    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const driverList = await GetAllDrivers();
                console.log("Conductores obtenidos:", driverList); // Verificar si se obtienen los conductores
                setDrivers(driverList);
            } catch (error) {
                console.error("Error al obtener conductores", error);
                setErrorMessage("No se pudieron cargar los conductores"); // Mensaje de error en caso de fallo
            }
        };
        fetchDrivers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        const newVehicle = {
            VehiclePlate,
            VehicleModel,
            VehicleYear: parseInt(VehicleYear, 10),
            Driver: { DriverId },
            modified: new Date().toISOString(),
            modifiedBy,
        };

        try {
            const result = await CreateVehicle(newVehicle);
            alert("Vehículo creado exitosamente");
            setVehiclePlate('');
            setVehicleModel('');
            setVehicleYear('');
            setModifiedBy('');
            setDriverId('');
            navigate('/vehicles');
        } catch (error) {
            console.error("Error al crear el vehículo", error);
            setErrorMessage("Error al crear el vehículo");
        }
    };

    return (
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
                <label>Modificado por:</label>
                <input
                    type="text"
                    value={modifiedBy}
                    onChange={(e) => setModifiedBy(e.target.value)}
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
                        <option key={driver.driverId} value={driver.driverId}>
                            {driver.DriverName}
                        </option>
                    ))}
                </select>
            </div>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <button type="submit">Crear Vehículo</button>
        </form>
    );
};

export default CreateVehicleForm;
