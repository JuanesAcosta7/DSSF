import React, { useState, useEffect } from 'react';
import { CreateRole } from '../Service/RolService.js';
import { useNavigate } from 'react-router-dom';

const CreateRoleForm = () => {
    const [rolName, setRolName] = useState('');
    const [modifiedBy, setModifiedBy] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    // Este useEffect se asegura de que el "modifiedBy" se cargue con el userId al cargar el formulario
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            setModifiedBy(userId); // Asignamos el userId al campo "modifiedBy"
        }
    }, []); // Solo se ejecuta una vez cuando el componente se monta

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        const newRole = {
            rol: rolName, // Asegúrate de usar la propiedad correcta
            Modified: new Date().toISOString(),
            modifiedBy, // Aquí se asigna el userId
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
        <div className="create-user-container">
            <div className="create-user-box">
                <h2>Crear Rol</h2>
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
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <button type="submit">Crear Rol</button>
                </form>
            </div>
        </div>
    );
};

export default CreateRoleForm;
