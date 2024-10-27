import React, { useState } from 'react';
import { CreateDriver } from '../Service/DriverService.js';
import { useNavigate } from 'react-router-dom';

const CreateDriverForm = () => {
    const [driverName, setDriverName] = useState('');
    const [licenseNumber, setLicenseNumber] = useState('');
    const [phone, setPhone] = useState('');
    const [modifiedBy, setModifiedBy] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // Estado para manejar errores

    const navigate = useNavigate(); // Usar useNavigate para redirigir a otras páginas

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Resetea el mensaje de error

        const newDriver = {
            driverName,
            licenseNumber,
            phone,
            modified: new Date().toISOString(), // Asigna la fecha actual
            modifiedBy,
        };

        try {
            const result = await CreateDriver(newDriver);
            alert("Conductor creado exitosamente");
            // Limpia el formulario después de crear el conductor
            setDriverName('');
            setLicenseNumber('');
            setPhone('');
            setModifiedBy('');
            navigate('/drivers'); // Redirige a la lista de conductores
        } catch (error) {
            setErrorMessage("Error al crear el conductor"); // Manejo de errores
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nombre del Conductor:</label>
                <input
                    type="text"
                    value={driverName}
                    onChange={(e) => setDriverName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Número de Licencia:</label>
                <input
                    type="text"
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Teléfono:</label>
                <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
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
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Muestra el mensaje de error */}
            <button type="submit">Crear Conductor</button>
        </form>
    );
};

export default CreateDriverForm;
