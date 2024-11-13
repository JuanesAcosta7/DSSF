import React from 'react';
import { NavLink } from 'react-router-dom';

const EntityDashboard = ({ userName }) => {
    // Obtener el ID del usuario desde el localStorage
    const userId = localStorage.getItem('userId');

    return (
        <div className="dashboard-container">
            <h2>Bienvenido, {userName}</h2>
            <h3>Selecciona una entidad</h3>
            <ul className="entity-list">
                {/* Usar el ID del usuario para crear el enlace a su perfil */}
                <li className="entity-item">
                    <NavLink to={`/users/${userId}`} activeClassName="active-link">Mi Perfil</NavLink>
                </li>
                <li className="entity-item">
                    <NavLink to="/drivers" activeClassName="active-link">Conductores</NavLink>
                </li>
                <li className="entity-item">
                    <NavLink to="/users" activeClassName="active-link">Usuarios</NavLink>
                </li>
                <li className="entity-item">
                    <NavLink to="/infractions" activeClassName="active-link">Infracciones</NavLink>
                </li>
                <li className="entity-item">
                    <NavLink to="/vehicles" activeClassName="active-link">Vehículos</NavLink>
                </li>
                <li className="entity-item">
                    <NavLink to="/roles" activeClassName="active-link">Roles</NavLink>
                </li>
                <li className="entity-item">
                    <NavLink to="/usertypes" activeClassName="active-link">UserTypes</NavLink>
                </li>
            </ul>
        </div>
    );
};

export default EntityDashboard;

