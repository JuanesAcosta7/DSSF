import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../Service/UserService.js';

const CreateUserPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleShowPolicies = () => {
        alert(
            "Políticas de Tratamiento de Datos:\n\n" +
            "1. Recopilamos y almacenamos datos personales con fines de gestión y seguridad.\n" +
            "2. Los datos no serán compartidos con terceros sin autorización.\n" +
            "3. Puede solicitar la eliminación de sus datos en cualquier momento.\n\n" +
            "Para más información, contáctenos a través de nuestro sitio web."
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setError('Por favor ingrese un correo electrónico válido.');
            return;
        }

        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordPattern.test(password)) {
            setError('La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y caracteres especiales.');
            return;
        }

        if (!termsAccepted) {
            setError('Debe aceptar los términos y condiciones para crear una cuenta.');
            return;
        }

        try {
            setLoading(true);
            const newUser = { name, email, password, modifiedBy: 'Usuario' };
            await createUser(newUser);
            setLoading(false);
            navigate('/');
        } catch (err) {
            setLoading(false);
            setError('Error al crear el usuario');
            console.error(err);
        }
    };

    return (
        <div className="create-user-container">
            <div className="create-user-box">
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
                    <div className="checkbox-container">
                        <input
                            type="checkbox"
                            checked={termsAccepted}
                            onChange={(e) => setTermsAccepted(e.target.checked)}
                        />
                        <label>Acepto los términos y condiciones de tratamiento de datos.</label>
                        <p>
                            <a href="#" onClick={handleShowPolicies}>
                                Políticas de tratamiento de datos
                            </a>
                        </p>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" disabled={loading}>
                        {loading ? 'Creando...' : 'Crear Usuario'}
                    </button>
                </form>
            </div>
        </div>
    );

};

export default CreateUserPage;
