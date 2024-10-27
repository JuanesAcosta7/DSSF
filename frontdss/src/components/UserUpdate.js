import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GetUserById, UpdateUser } from '../Service/UserService.js'; 

const UpdateUserForm = () => {
    const { id } = useParams(); 
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
                const fetchedUser = await GetUserById(id); 
                if (fetchedUser) {
                    setUser(fetchedUser); 
                }
            } catch (error) {
                console.error("Error fetching user by id", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]); 

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value }); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedUser = {
            ...user,
            modified: new Date().toISOString(), 
            modifiedBy: 'tuNombreUsuario' 
        };

        try {
            const result = await UpdateUser(id, updatedUser);
            if (result) {
                setMessage('Usuario actualizado con éxito');
            } else {
                setMessage('Error actualizando el usuario');
            }
        } catch (error) {
            setMessage('Error al actualizar el usuario');
        }
    };

    if (loading) {
        return <div>Cargando...</div>; 
    }

    return (
        <div>
            <h2>Actualizar Usuario</h2>
            {message && <p>{message}</p>} 
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
                    <label>Contraseña</label>
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
