import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../Service/UserService.js'; // Servicio para crear un usuario

const CreateUserPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [modifiedBy, setModifiedBy] = useState(''); // Nuevo estado para ModifiedBy
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newUser = { name, email, password, modifiedBy };
            await createUser(newUser);
            // Redirigir al login o dashboard después de crear el usuario
            navigate('/login');
        } catch (err) {
            setError('Error al crear el usuario');
            console.error(err);
        }
    };

    return (
        <div>
            <h2>Crear Nuevo Usuario</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Modificado por:</label>
                    <input
                        type="text"
                        value={modifiedBy}
                        onChange={(e) => setModifiedBy(e.target.value)} // Actualización del estado ModifiedBy
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Crear Usuario</button>
            </form>
        </div>
    );
};

export default CreateUserPage;
