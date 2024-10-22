import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GetUserById } from '../Service/UserService.js'; // Asegúrate de tener esta función en tu servicio

const UserDetail = () => {
    const { id } = useParams(); // Captura el ID de la URL
    const [user, setUser] = useState(null); // Estado para almacenar los datos del usuario

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const result = await GetUserById(id); // Llama al servicio para obtener el usuario
                setUser(result);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        fetchUser();
    }, [id]); // El efecto se ejecuta cuando cambia el ID

    if (!user) return <div>Cargando...</div>; // Muestra un mensaje de carga mientras se obtienen los datos

    return (
        <div>
            <h2>Detalles del Usuario</h2>
            <p>Nombre: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Contraseña: {user.password}</p> {/* Muestra la contraseña */}
            <p>Modificado por: {user.modifiedBy}</p>
            {/* Otros detalles que desees mostrar */}
        </div>
    );
};

export default UserDetail;
