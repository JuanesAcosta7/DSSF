import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GetUserById, UpdateUser } from '../Service/UserService.js'; // Aseg�rate de tener estas funciones en tu servicio

const UpdateUserForm = () => {
    const { id } = useParams(); // Captura el ID del usuario desde la URL
    const [user, setUser] = useState({
        userId: id,
        name: '',
        email: '',
        password: '',
        modifiedBy: '',
    });

    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const fetchedUser = await GetUserById(id); // Obt�n los datos del usuario por ID
                if (fetchedUser) {
                    setUser(fetchedUser); // Actualiza el estado con los datos del usuario
                }
            } catch (error) {
                console.error("Error fetching user by id", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]); // Se ejecuta cuando cambia el ID

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value }); // Actualiza el estado cuando cambian los inputs
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedUser = {
            ...user,
            modified: new Date().toISOString(), // Actualiza la fecha de modificaci�n
            modifiedBy: 'tuNombreUsuario' // Actualiza el valor de 'modifiedBy' (esto lo puedes cambiar din�micamente)
        };

        try {
            const result = await UpdateUser(id, updatedUser); // Actualiza el usuario
            if (result) {
                setMessage('Usuario actualizado con �xito');
            } else {
                setMessage('Error actualizando el usuario');
            }
        } catch (error) {
            setMessage('Error al actualizar el usuario');
        }
    };

    if (loading) {
        return <div>Cargando...</div>; // Muestra un mensaje de carga mientras se obtienen los datos
    }

    return (
        <div>
            <h2>Actualizar Usuario</h2>
            {message && <p>{message}</p>} {/* Muestra un mensaje despu�s de actualizar */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre</label>
                    <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Contrase�a</label>
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Modificado por</label>
                    <input
                        type="text"
                        name="modifiedBy"
                        value={user.modifiedBy}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit">Actualizar</button>
            </form>
        </div>
    );
};

export default UpdateUserForm;
