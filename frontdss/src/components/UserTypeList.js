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
        <div className="user-type-list-container">
            <h2>Lista de Tipos de Usuario</h2>
            <button onClick={() => navigate('/create-usertype')} className="add-button">Agregar Tipo de Usuario</button>
            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Tipo de Usuario</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userTypes.map(userType => (
                            <tr key={userType.userTypeId}>
                                <td>
                                    <Link to={`/usertypes/${userType.userTypeId}`} className="table-link">{userType.type.rol}</Link>
                                </td>
                                <td className="table-actions">
                                    <button onClick={() => handleEdit(userType.userTypeId)} className="update-button">Actualizar</button>
                                    <button onClick={() => handleDelete(userType.userTypeId)} className="delete-button">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserTypeList;


