import React from 'react';
import UserList from '../components/UserList.js'; // Asegúrate de tener este componente

const HomeUser = () => {
    return (
        <div>
            <h1>Usuarios</h1>
            <UserList /> {/* Este componente mostrará la lista de usuarios */}
        </div>
    );
};

export default HomeUser;
