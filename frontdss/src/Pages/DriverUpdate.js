import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GetDriverById, UpdateDriver } from '../Service/DriverService.js';

const UpdateDriverPage = () => {
    const { id } = useParams(); 
    const navigate = useNavigate(); 
    const [driver, setDriver] = useState({
        DriverName: '',
        LicenseNumber: '',
        Phone: '',
        ModifiedBy: ''
    });

    useEffect(() => {
        const fetchDriver = async () => {
            console.log("Driver ID from URL:", id); 
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

    const handleChange = (e) => {
        setDriver({
            ...driver,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Updating driver with data:", driver); 
            await UpdateDriver(id, driver);
            navigate('/'); 
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
                    <label>N�mero de Licencia:</label>
                    <input
                        type="text"
                        name="LicenseNumber"
                        value={driver.LicenseNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Tel�fono:</label>
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
