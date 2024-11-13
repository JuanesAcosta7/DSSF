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
            "Pol�ticas de Tratamiento de Datos:\n\n" +
            "1. Recopilamos y almacenamos datos personales con fines de gesti�n y seguridad.\n" +
            "2. Los datos no ser�n compartidos con terceros sin autorizaci�n.\n" +
            "3. Puede solicitar la eliminaci�n de sus datos en cualquier momento.\n\n" +
            "Para m�s informaci�n, cont�ctenos a trav�s de nuestro sitio web."
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setError('Por favor ingrese un correo electr�nico v�lido.');
            return;
        }

        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordPattern.test(password)) {
            setError('La contrase�a debe tener al menos 8 caracteres, incluyendo may�sculas, min�sculas, n�meros y caracteres especiales.');
            return;
        }

        if (!termsAccepted) {
            setError('Debe aceptar los t�rminos y condiciones para crear una cuenta.');
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
                        <label>Contrase�a:</label>
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
                        <label>Acepto los t�rminos y condiciones de tratamiento de datos.</label>
                        <p>
                            <a href="#" onClick={handleShowPolicies}>
                                Pol�ticas de tratamiento de datos
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
