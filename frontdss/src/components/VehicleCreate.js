import React, { useState } from 'react';
import { CreateVehicle } from '../Service/VehicleService.js';
import { useNavigate } from 'react-router-dom';

const CreateVehicleForm = () => {
    const [vehiclePlate, setVehiclePlate] = useState('');
    const [vehicleModel, setVehicleModel] = useState('');
    const [vehicleYear, setVehicleYear] = useState('');
    const [modifiedBy, setModifiedBy] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); 

    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); 

        const newVehicle = {
            vehiclePlate,
            vehicleModel,
            vehicleYear: parseInt(vehicleYear, 10), 
            modified: new Date().toISOString(), 
            modifiedBy,
        };

        try {
            const result = await CreateVehicle(newVehicle);
            alert("Veh�culo creado exitosamente");
            setVehiclePlate('');
            setVehicleModel('');
            setVehicleYear('');
            setModifiedBy('');
            navigate('/vehicles'); 
        } catch (error) {
            setErrorMessage("Error al crear el veh�culo"); 
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Placa del Veh�culo:</label>
                <input
                    type="text"
                    value={vehiclePlate}
                    onChange={(e) => setVehiclePlate(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Modelo del Veh�culo:</label>
                <input
                    type="text"
                    value={vehicleModel}
                    onChange={(e) => setVehicleModel(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>A�o del Veh�culo:</label>
                <input
                    type="number"
                    value={vehicleYear}
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
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} 
            <button type="submit">Crear Veh�culo</button>
        </form>
    );
};

export default CreateVehicleForm;
