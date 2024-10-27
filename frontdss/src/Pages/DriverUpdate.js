import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GetDriverById, UpdateDriver } from '../Service/DriverService.js';

const UpdateDriverPage = () => {
    const { id } = useParams(); // Captura el ID desde la URL
    const navigate = useNavigate(); // Para redireccionar después de la actualización
    const [driver, setDriver] = useState({
        DriverName: '',
        LicenseNumber: '',
        Phone: '',
        ModifiedBy: ''
    });

    // Cargar datos del conductor al montar el componente
    useEffect(() => {
        const fetchDriver = async () => {
            console.log("Driver ID from URL:", id); // Verifica el valor del ID
            try {
                const fetchedDriver = await GetDriverById(id);
                if (fetchedDriver) {
                    setDriver(fetchedDriver);
                }
            } catch (error) {
                console.error("Error fetching driver:", error);
            }
        };
        fetchDriver();
    }, [id]);

    // Función para manejar cambios en el formulario
    const handleChange = (e) => {
        setDriver({
            ...driver,
            [e.target.name]: e.target.value
        });
    };

    // Función para manejar el submit del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Updating driver with data:", driver); // Imprime los datos para verificar
            await UpdateDriver(id, driver);
            navigate('/'); // Redirecciona después de la actualización
        } catch (error) {
            console.error("Error updating driver:", error);
        }
    };

    return (
        <div>
            <h1>Actualizar Conductor</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="DriverName"
                        value={driver.DriverName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Número de Licencia:</label>
                    <input
                        type="text"
                        name="LicenseNumber"
                        value={driver.LicenseNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Teléfono:</label>
                    <input
                        type="text"
                        name="Phone"
                        value={driver.Phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Modificado por:</label>
                    <input
                        type="text"
                        name="ModifiedBy"
                        value={driver.ModifiedBy}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Actualizar Conductor</button>
            </form>
        </div>
    );
};

export default UpdateDriverPage;
