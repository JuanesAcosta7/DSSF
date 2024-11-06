import React from 'react';
import { NavLink } from 'react-router-dom';

const EntityDashboard = () => {
    return (
        <div className="dashboard-container">
            <h2>Selecciona una entidad</h2>
            <ul className="entity-list">
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
