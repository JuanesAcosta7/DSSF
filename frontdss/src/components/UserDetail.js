import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GetUserById } from '../Service/UserService.js'; 

const UserDetail = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null); 

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const result = await GetUserById(id); 
                setUser(result);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        fetchUser();
    }, [id]); 

    if (!user) return <div>Cargando...</div>; 

    return (
        <div>
            <h2>Detalles del Usuario</h2>
            <p>Nombre: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Contraseña: {user.password}</p> 
            <p>Modificado por: {user.modifiedBy}</p>
        </div>
    );
};

export default UserDetail;
