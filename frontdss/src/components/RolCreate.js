import React, { useState } from 'react';
import { CreateRole } from '../Service/RolService.js';
import { useNavigate } from 'react-router-dom';

const CreateRoleForm = () => {
    const [rolName, setRolName] = useState('');
    const [modifiedBy, setModifiedBy] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        const newRole = {
            rol: rolName, // Asegúrate de usar la propiedad correcta
            Modified: new Date().toISOString(),
            modifiedBy , // Cambia esto según el usuario actual
        };

        try {
            await CreateRole(newRole); // Eliminar la variable result si no la usas
            alert("Rol creado exitosamente");
            setRolName(''); // Limpiar el campo de entrada
            setModifiedBy('');
            navigate('/roles'); // Redirigir a la lista de roles
        } catch (error) {
            setErrorMessage(error.message || "Error al crear el rol");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nombre del Rol:</label>
                <input
                    type="text"
                    value={rolName}
                    onChange={(e) => setRolName(e.target.value)}
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
            <button type="submit">Crear Rol</button>
        </form>
    );
};

export default CreateRoleForm;
