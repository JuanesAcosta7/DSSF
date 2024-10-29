import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GetUserTypeById, UpdateUserType } from '../Service/UserTypeService.js';

const UpdateUserTypeForm = () => {
    const { id } = useParams();
    const [userType, setUserType] = useState({
        userTypeId: id,
        userId: '',
        typeId: '',
    });

    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchUserType = async () => {
            try {
                const fetchedUserType = await GetUserTypeById(id);
                if (fetchedUserType) {
                    setUserType(fetchedUserType);
                }
            } catch (error) {
                console.error("Error fetching user type by id", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserType();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserType({ ...userType, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedUserType = {
            ...userType,
            modified: new Date().toISOString(),
            modifiedBy: 'tuNombreUsuario',
        };

        try {
            const result = await UpdateUserType(id, updatedUserType);
            if (result) {
                setMessage('Tipo de usuario actualizado con éxito');
            } else {
                setMessage('Error actualizando el tipo de usuario');
            }
        } catch (error) {
            setMessage('Error al actualizar el tipo de usuario');
        }
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <h2>Actualizar Tipo de Usuario</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>ID del Usuario</label>
                    <input
                        type="text"
                        name="userId"
                        value={userType.userId}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>ID del Rol</label>
                    <input
                        type="text"
                        name="typeId"
                        value={userType.typeId}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit">Actualizar</button>
            </form>
        </div>
    );
};

export default UpdateUserTypeForm;
