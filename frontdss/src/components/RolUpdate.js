import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GetRoleById, UpdateRole } from '../Service/RolService.js';

const UpdateRoleForm = () => {
    const { id } = useParams();
    const [role, setRole] = useState({
        rolId: id,
        rolName: '',
    });

    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchRole = async () => {
            try {
                const fetchedRole = await GetRoleById(id);
                if (fetchedRole) {
                    setRole(fetchedRole);
                }
            } catch (error) {
                console.error("Error fetching role by id", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRole();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRole({ ...role, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedRole = {
            ...role,
            modified: new Date().toISOString(),
            modifiedBy: 'tuNombreUsuario',
        };

        try {
            const result = await UpdateRole(id, updatedRole);
            if (result) {
                setMessage('Rol actualizado con éxito');
            } else {
                setMessage('Error actualizando el rol');
            }
        } catch (error) {
            setMessage('Error al actualizar el rol');
        }
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <h2>Actualizar Rol</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre del Rol</label>
                    <input
                        type="text"
                        name="rolName"
                        value={role.rolName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit">Actualizar</button>
            </form>
        </div>
    );
};

export default UpdateRoleForm;
