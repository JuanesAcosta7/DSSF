import React, { useState } from 'react';
import { CreateInfraction } from '../Service/InfractionService.js'; 
import { useNavigate } from 'react-router-dom';

const CreateInfractionForm = () => {
    const [date, setDate] = useState('');
    const [ubication, setUbication] = useState('');
    const [recordedSpeed, setRecordedSpeed] = useState('');
    const [limitedSpeed, setLimitedSpeed] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('');
    const [driverId, setDriverId] = useState(''); 
    const [vehicleId, setVehicleId] = useState(''); 
    const [modifiedBy, setModifiedBy] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); 
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        const newInfraction = {
            date,
            ubication,
            recordedSpeed: parseInt(recordedSpeed),
            limitedSpeed: parseInt(limitedSpeed),
            paymentStatus,
            driver: { driverId }, 
            vehicle: { vehicleId }, 
            modified: new Date().toISOString(), 
            modifiedBy,
        };

        try {
            const result = await CreateInfraction(newInfraction);
            alert("Infracción creada exitosamente");
            setDate('');
            setUbication('');
            setRecordedSpeed('');
            setLimitedSpeed('');
            setPaymentStatus('');
            setDriverId('');
            setVehicleId('');
            setModifiedBy('');
            navigate('/infractions'); 
        } catch (error) {
            setErrorMessage("Error al crear la infracción"); 
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Fecha:</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Ubicación:</label>
                <input
                    type="text"
                    value={ubication}
                    onChange={(e) => setUbication(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Velocidad Registrada:</label>
                <input
                    type="number"
                    value={recordedSpeed}
                    onChange={(e) => setRecordedSpeed(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Velocidad Límite:</label>
                <input
                    type="number"
                    value={limitedSpeed}
                    onChange={(e) => setLimitedSpeed(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Estado de Pago:</label>
                <input
                    type="text"
                    value={paymentStatus}
                    onChange={(e) => setPaymentStatus(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>ID del Conductor:</label>
                <input
                    type="text"
                    value={driverId}
                    onChange={(e) => setDriverId(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>ID del Vehículo:</label>
                <input
                    type="text"
                    value={vehicleId}
                    onChange={(e) => setVehicleId(e.target.value)}
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
            <button type="submit">Crear Infracción</button>
        </form>
    );
};

export default CreateInfractionForm;
