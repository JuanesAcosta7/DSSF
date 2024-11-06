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
            console.log("Respuesta de la API:", response);
            if (response && response.data && response.data.userId) {
                const userId = response.data.userId; 
                localStorage.setItem('userId', userId); 
                navigate('/dashboard'); 
            } else {
                setError("Credenciales inválidas");
            }
        } catch (err) {
            setError("Credenciales inválidas");
            console.error("Error al hacer login:", err);
        }
    };


    return (
        <div className="login-container">
            <div className="login-box">
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
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit">Iniciar Sesión</button>
                </form>
                <p>¿No tienes cuenta? <Link to="/create-user">Crear un nuevo usuario</Link></p>
            </div>
        </div>
    );
};

export default LoginPage;
