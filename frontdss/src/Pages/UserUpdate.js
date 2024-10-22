import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GetUserById, UpdateUser } from '../Service/UserService.js'; // Asegúrate de tener estas funciones

const UpdateUserPage = () => {
    const { id } = useParams(); // Captura el ID desde la URL
    const navigate = useNavigate(); // Para redireccionar después de la actualización
    const [user, setUser] = useState({
        Name: '',
        Email: '',
        Password: '',
        ModifiedBy: ''
    });

    // Cargar datos del usuario al montar el componente
    useEffect(() => {
        const fetchUser = async () => {
            console.log("User ID from URL:", id); // Verifica el valor del ID
            try {
                const fetchedUser = await GetUserById(id);
                if (fetchedUser) {
                    setUser(fetchedUser);
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        fetchUser();
    }, [id]);

    // Función para manejar cambios en el formulario
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    // Función para manejar el submit del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Updating user with data:", user); // Imprime los datos para verificar
            await UpdateUser(id, user);
            navigate('/'); // Redirecciona después de la actualización
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    return (
        <div>
            <h1>Actualizar Usuario</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="Name"
                        value={user.Name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="Email"
                        value={user.Email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        name="Password"
                        value={user.Password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Modificado por:</label>
                    <input
                        type="text"
                        name="ModifiedBy"
                        value={user.ModifiedBy}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Actualizar Usuario</button>
            </form>
        </div>
    );
};

export default UpdateUserPage;
