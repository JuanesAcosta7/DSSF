import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GetUserTypeById } from '../Service/UserTypeService.js';

const UserTypeDetail = () => {
    const { id } = useParams(); // Asegúrate de que el parámetro coincida con la ruta configurada
    const [userType, setUserType] = useState(null);

    useEffect(() => {
        const fetchUserType = async () => {
            console.log("ID del tipo de usuario:", id);
            try {
                const result = await GetUserTypeById(id);
                setUserType(result);
            } catch (error) {
                console.error("Error al obtener detalles del tipo de usuario:", error);
            }
        };
        fetchUserType();
    }, [id]);

    if (!userType) return <div>Cargando...</div>;

    return (
        <div>
            <h2>Detalles del Tipo de Usuario</h2>
            <p>Usuario: {userType.user.userName}</p> 
            <p>Rol: {userType.type.rol}</p>
            <p>Modificado por: {userType.modifiedBy}</p>
        </div>
    );
};

export default UserTypeDetail;
