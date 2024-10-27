import React from 'react';
import UserList from '../components/UserList.js'; // Aseg�rate de tener este componente

const HomeUser = () => {
    return (
        <div>
            <h1>Usuarios</h1>
            <UserList /> {/* Este componente mostrar� la lista de usuarios */}
        </div>
    );
};

export default HomeUser;
