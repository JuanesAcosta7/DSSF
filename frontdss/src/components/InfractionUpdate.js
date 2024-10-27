import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GetInfractionById, UpdateInfraction } from '../Service/InfractionService.js';

const UpdateInfractionForm = () => {
    const { Id } = useParams();
    console.log("Infraction ID:", Id); 
    const [infraction, setInfraction] = useState({
        infracctionId: 'Id',
        date: '',
        ubication: '',
        recordedSpeed: '',
        limitedSpeed: '',
        paymentStatus: '',
        driver: { driverId: '' },
        vehicle: { vehicleId: '' }
    });

    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchInfraction = async () => {
            try {
                const fetchedInfraction = await GetInfractionById(Id);
                if (fetchedInfraction) {
                    setInfraction(fetchedInfraction);
                }
            } catch (error) {
                console.error("Error fetching infraction by id", error);
            } finally {
                setLoading(false);
            }
        };

        fetchInfraction();
    }, [Id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInfraction({ ...infraction, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedInfraction = {
            ...infraction,
            modified: new Date().toISOString(),
            modifiedBy: 'tuNombreUsuario'
        };

        try {
            const result = await UpdateInfraction(Id, updatedInfraction);
            if (result) {
                setMessage('Infracción actualizada con éxito');
            } else {
                setMessage('Error actualizando la infracción');
            }
        } catch (error) {
            setMessage('Error al actualizar la infracción');
        }
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <h2>Actualizar Infracción</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Fecha</label>
                    <input
                        type="date"
                        name="date"
                        value={infraction.date}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Ubicación</label>
                    <input
                        type="text"
                        name="ubication"
                        value={infraction.ubication}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Velocidad Registrada</label>
                    <input
                        type="number"
                        name="recordedSpeed"
                        value={infraction.recordedSpeed}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Velocidad Límite</label>
                    <input
                        type="number"
                        name="limitedSpeed"
                        value={infraction.limitedSpeed}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Estado de Pago</label>
                    <input
                        type="text"
                        name="paymentStatus"
                        value={infraction.paymentStatus}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>ID del Conductor</label>
                    <input
                        type="text"
                        name="driverId"
                        value={infraction.driver.driverId}
                        onChange={(e) => setInfraction({
                            ...infraction,
                            driver: { driverId: e.target.value }
                        })}
                        required
                    />
                </div>
                <div>
                    <label>ID del Vehículo</label>
                    <input
                        type="text"
                        name="vehicleId"
                        value={infraction.vehicle.vehicleId}
                        onChange={(e) => setInfraction({
                            ...infraction,
                            vehicle: { vehicleId: e.target.value }
                        })}
                        required
                    />
                </div>
                <button type="submit">Actualizar</button>
            </form>
        </div>
    );
};

export default UpdateInfractionForm;
