import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../Service/UserService.js';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login({ email, password });
            if (response && response.data) {
                navigate('/dashboard'); 
            }
        } catch (err) {
            setError("Credenciales inválidas");
            console.error(err);
        }
    };

    return (
        <div>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
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
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Iniciar Sesión</button>
            </form>
            <p>¿No tienes cuenta? <Link to="/create-user">Crear un nuevo usuario</Link></p>
        </div>
    );
};

export default LoginPage;
