import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GetInfractionById, UpdateInfraction } from '../Service/InfractionService.js';

const UpdateInfractionPage = () => {
    const { id } = useParams(); 
    const navigate = useNavigate(); 
    const [infraction, setInfraction] = useState({
        Date: '',
        Ubication: '',
        RecordedSpeed: '',
        LimitedSpeed: '',
        PaymentStatus: '',
        ModifiedBy: ''
    });

    useEffect(() => {
        const fetchInfraction = async () => {
            console.log("Infraction ID from URL:", id); 
            try {
                const fetchedInfraction = await GetInfractionById(id);
                if (fetchedInfraction) {
                    setInfraction(fetchedInfraction);
                }
            } catch (error) {
                console.error("Error fetching infraction:", error);
            }
        };
        fetchInfraction();
    }, [id]);

    const handleChange = (e) => {
        setInfraction({
            ...infraction,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Updating infraction with data:", infraction); 
            await UpdateInfraction(id, infraction);
            navigate('/'); 
        } catch (error) {
            console.error("Error updating infraction:", error);
        }
    };

    return (
        <div>
            <h1>Actualizar Infracción</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Fecha:</label>
                    <input
                        type="text"
                        name="Date"
                        value={infraction.Date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Ubicación:</label>
                    <input
                        type="text"
                        name="Ubication"
                        value={infraction.Ubication}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Velocidad Registrada:</label>
                    <input
                        type="number"
                        name="RecordedSpeed"
                        value={infraction.RecordedSpeed}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Velocidad Límite:</label>
                    <input
                        type="number"
                        name="LimitedSpeed"
                        value={infraction.LimitedSpeed}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Estado de Pago:</label>
                    <input
                        type="text"
                        name="PaymentStatus"
                        value={infraction.PaymentStatus}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Modificado por:</label>
                    <input
                        type="text"
                        name="ModifiedBy"
                        value={infraction.ModifiedBy}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Actualizar Infracción</button>
            </form>
        </div>
    );
};

export default UpdateInfractionPage;
