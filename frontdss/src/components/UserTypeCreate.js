import React, { useState, useEffect } from 'react';
import { CreateUserType } from '../Service/UserTypeService.js';
import { useNavigate } from 'react-router-dom';

const CreateUserTypeForm = () => {
    const [userId, setUserId] = useState('');
    const [roleId, setRoleId] = useState('');
    const [modifiedBy, setModifiedBy] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    // Obtener el userId de localStorage al montar el componente
    useEffect(() => {
        const userIdFromStorage = localStorage.getItem('userId');
        if (userIdFromStorage) {
            setModifiedBy(userIdFromStorage); // Asignamos el userId al campo "modifiedBy"
        }
    }, []); // Solo se ejecuta una vez cuando el componente se monta

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        const newUserType = {
            userId,
            typeId: roleId,
            Modified: new Date().toISOString(),
            modifiedBy, // Usamos el userId en el campo modifiedBy
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
        <div className="create-user-container">
            <div className="create-user-box">
                <h2>Crear Tipo de Usuario</h2>
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
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <button type="submit">Crear Tipo de Usuario</button>
                </form>
            </div>
        </div>
    );
};

export default CreateUserTypeForm;
