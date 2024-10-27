import React from 'react';
import { Link } from 'react-router-dom';

const EntityDashboard = () => {
    return (
        <div>
            <h2>Selecciona una entidad</h2>
            <ul>
                <li>
                    <Link to="/drivers">Conductores</Link> {/* Enlace a la página de conductores */}
                </li>
                <li>
                    <Link to="/users">Usuarios</Link> {/* Enlace a la página de usuarios */}
                </li>
            </ul>
        </div>
    );
};

export default EntityDashboard;