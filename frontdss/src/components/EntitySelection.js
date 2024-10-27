import React from 'react';
import { Link } from 'react-router-dom';

const EntityDashboard = () => {
    return (
        <div>
            <h2>Selecciona una entidad</h2>
            <ul>
                <li>
                    <Link to="/drivers">Conductores</Link> 
                </li>
                <li>
                    <Link to="/users">Usuarios</Link> 
                </li>
                <li>
                    <Link to="/infractions">Infracciones</Link> 
                </li>
                <li>
                    <Link to="/vehicles">Vehiculos</Link>
                </li>
                <li>
                    <Link to="/rols">Roles</Link> 
                </li>
            </ul>
        </div>
    );
};

export default EntityDashboard;