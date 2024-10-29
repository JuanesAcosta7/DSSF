import React, { useState } from 'react';
import { CreateUserType } from '../Service/UserTypeService.js';
import { useNavigate } from 'react-router-dom';

const CreateUserTypeForm = () => {
    const [userId, setUserId] = useState('');
    const [roleId, setRoleId] = useState('');
    const [modifiedBy, setModifiedBy] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        const newUserType = {
            userId,
            typeId: roleId,
            Modified: new Date().toISOString(),
            modifiedBy,
        };

        try {
            await CreateUserType(newUserType);
            alert("Tipo de usuario creado exitosamente");
            setUserId('');
            setRoleId('');
            setModifiedBy('');
            navigate('/usertypes'); // Redirigir a la lista de tipos de usuario
        } catch (error) {
            setErrorMessage(error.message || "Error al crear el tipo de usuario");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>ID del Usuario:</label>
                <input
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>ID del Rol:</label>
                <input
                    type="text"
                    value={roleId}
                    onChange={(e) => setRoleId(e.target.value)}
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
            <button type="submit">Crear Tipo de Usuario</button>
        </form>
    );
};

export default CreateUserTypeForm;
