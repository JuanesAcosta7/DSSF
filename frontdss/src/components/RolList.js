import React, { useEffect, useState } from 'react';
import { GetAllRoles, DeleteRole } from '../Service/RolService.js';
import { Link, useNavigate } from 'react-router-dom';

const RoleList = () => {
    const [roles, setRoles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const data = await GetAllRoles();
                setRoles(data);
            } catch (error) {
                console.error("Error fetching roles:", error);
            }
        };
        fetchRoles();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este rol?");
        if (confirmDelete) {
            const result = await DeleteRole(id);
            if (result) {
                setRoles(roles.filter(role => role.rolId !== id));
            } else {
                alert("Error al eliminar el rol");
            }
        }
    };

    const handleEdit = (id) => {
        navigate(`/update-role/${id}`);
    };

    return (
        <div className="driver-list-container">
            <h2>Lista de Roles</h2>
            <button onClick={() => navigate('/create-role')} className="add-button">Agregar Rol</button>
            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nombre del Rol</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roles.map(role => (
                            <tr key={role.rolId}>
                                <td>
                                    <Link to={`/roles/${role.rolId}`} className="table-link">{role.rol}</Link>
                                </td>
                                <td className="table-actions">
                                    <button onClick={() => handleEdit(role.rolId)} className="update-button">Actualizar</button>
                                    <button onClick={() => handleDelete(role.rolId)} className="delete-button">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RoleList;
