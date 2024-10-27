import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GetVehicleById, UpdateVehicle } from '../Service/VehicleService.js'; 

const UpdateVehicleForm = () => {
    const { id } = useParams();
    console.log("Vehicle ID:", id); 
    const [vehicle, setVehicle] = useState({
        vehicleId: id,
        vehiclePlate: '',
        vehicleModel: '',
        vehicleYear: '',
    });

    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                const fetchedVehicle = await GetVehicleById(id);
                if (fetchedVehicle) {
                    setVehicle(fetchedVehicle);
                }
            } catch (error) {
                console.error("Error fetching vehicle by id", error);
            } finally {
                setLoading(false);
            }
        };

        fetchVehicle();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setVehicle({ ...vehicle, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedVehicle = {
            ...vehicle,
            modified: new Date().toISOString(),
            modifiedBy: 'tuNombreUsuario', 
        };

        try {
            const result = await UpdateVehicle(id, updatedVehicle);
            if (result) {
                setMessage('Vehículo actualizado con éxito');
            } else {
                setMessage('Error actualizando el vehículo');
            }
        } catch (error) {
            setMessage('Error al actualizar el vehículo');
        }
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <h2>Actualizar Vehículo</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Placa del Vehículo</label>
                    <input
                        type="text"
                        name="vehiclePlate"
                        value={vehicle.vehiclePlate}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Modelo del Vehículo</label>
                    <input
                        type="text"
                        name="vehicleModel"
                        value={vehicle.vehicleModel}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Año del Vehículo</label>
                    <input
                        type="number"
                        name="vehicleYear"
                        value={vehicle.vehicleYear}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit">Actualizar</button>
            </form>
        </div>
    );
};

export default UpdateVehicleForm;
