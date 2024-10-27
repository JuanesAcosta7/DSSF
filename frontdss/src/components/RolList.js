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
                console.log("Datos de la API de conductores:", data); 
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
        <div>
            <h2>Lista de Roles</h2>
            <button onClick={() => navigate('/create-role')}>Agregar Rol</button>
            <ul>
                {roles.map(rol => (
                    <li key={rol.rolId}>
                       
                        <Link to={`/roles/${rol.rolId}`}>{rol.rol}</Link>
                        <button onClick={() => handleEdit(rol.rolId)}>Actualizar</button>
                        <button onClick={() => handleDelete(rol.rolId)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RoleList;
