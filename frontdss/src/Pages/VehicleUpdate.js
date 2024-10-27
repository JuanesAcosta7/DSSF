import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GetVehicleById, UpdateVehicle } from '../Service/VehicleService.js'; 

const UpdateVehiclePage = () => {
    const { id } = useParams(); 
    const navigate = useNavigate(); 
    const [vehicle, setVehicle] = useState({
        VehicleName: '',
        LicensePlate: '',
        Model: '',
        ModifiedBy: ''
    });

    useEffect(() => {
        const fetchVehicle = async () => {
            console.log("Vehicle ID from URL:", id); 
            try {
                const fetchedVehicle = await GetVehicleById(id);
                if (fetchedVehicle) {
                    setVehicle(fetchedVehicle);
                }
            } catch (error) {
                console.error("Error fetching vehicle:", error);
            }
        };
        fetchVehicle();
    }, [id]);

    const handleChange = (e) => {
        setVehicle({
            ...vehicle,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Updating vehicle with data:", vehicle); 
            await UpdateVehicle(id, vehicle);
            navigate('/'); 
        } catch (error) {
            console.error("Error updating vehicle:", error);
        }
    };

    return (
        <div>
            <h1>Actualizar Vehículo</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre del Vehículo:</label>
                    <input
                        type="text"
                        name="VehicleName"
                        value={vehicle.VehicleName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Número de Placa:</label>
                    <input
                        type="text"
                        name="LicensePlate"
                        value={vehicle.LicensePlate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Modelo:</label>
                    <input
                        type="text"
                        name="Model"
                        value={vehicle.Model}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Modificado por:</label>
                    <input
                        type="text"
                        name="ModifiedBy"
                        value={vehicle.ModifiedBy}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Actualizar Vehículo</button>
            </form>
        </div>
    );
};

export default UpdateVehiclePage;
