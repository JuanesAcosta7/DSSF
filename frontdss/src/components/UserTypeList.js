import React, { useEffect, useState } from 'react';
import { GetAllUserTypes, DeleteUserType } from '../Service/UserTypeService.js';
import { Link, useNavigate } from 'react-router-dom';

const UserTypeList = () => {
    const [userTypes, setUserTypes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserTypes = async () => {
            try {
                const data = await GetAllUserTypes();
                console.log("Datos de la API de tipos de usuario:", data);
                setUserTypes(data);
            } catch (error) {
                console.error("Error obteniendo tipos de usuario:", error);
            }
        };
        fetchUserTypes();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este tipo de usuario?");
        if (confirmDelete) {
            const result = await DeleteUserType(id);
            if (result) {
                setUserTypes(userTypes.filter(userType => userType.userTypeId !== id));
            } else {
                alert("Error al eliminar el tipo de usuario");
            }
        }
    };

    const handleEdit = (id) => {
        navigate(`/update-usertype/${id}`);
    };

    return (
        <div>
            <h2>Lista de Tipos de Usuario</h2>
            <button onClick={() => navigate('/create-usertype')}>Agregar Tipo de Usuario</button>
            <ul>
                {userTypes.map(userType => (
                    <li key={userType.userTypeId}>
                        <Link to={`/usertypes/${userType.userTypeId}`}>{userType.type.rol}</Link>
                        <button onClick={() => handleEdit(userType.userTypeId)}>Actualizar</button>
                        <button onClick={() => handleDelete(userType.userTypeId)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserTypeList;
