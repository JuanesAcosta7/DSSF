import React, { useState, useEffect } from 'react';
import { CreateDriver } from '../Service/DriverService.js';
import { useNavigate } from 'react-router-dom';

const CreateDriverForm = () => {
    const [driverName, setDriverName] = useState('');
    const [licenseNumber, setLicenseNumber] = useState('');
    const [phone, setPhone] = useState('');
    const [modifiedBy, setModifiedBy] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();


    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            setModifiedBy(userId); 
        }
    }, []); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        const newDriver = {
            driverName,
            licenseNumber,
            phone,
            modified: new Date().toISOString(),
            modifiedBy, // Aquí se asigna el userId
        };

        try {
            const result = await CreateDriver(newDriver);
            alert("Conductor creado exitosamente");
            setDriverName('');
            setLicenseNumber('');
            setPhone('');
            setModifiedBy('');
            navigate('/drivers');
        } catch (error) {
            setErrorMessage("Error al crear el conductor");
        }
    };

    return (
        <div className="create-user-container">
            <div className="create-user-box">
                <h2>Crear Conductor</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nombre del Conductor:</label>
                        <input
                            type="text"
                            value={driverName}
                            onChange={(e) => setDriverName(e.target.value)}
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Número de Licencia:</label>
                        <input
                            type="text"
                            value={licenseNumber}
                            onChange={(e) => setLicenseNumber(e.target.value)}
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Teléfono:</label>
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="form-input"
                            required
                        />
                    </div>
                    
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <button type="submit" className="submit-btn">Crear Conductor</button>
                </form>
            </div>
        </div>
    );
};

export default CreateDriverForm;


