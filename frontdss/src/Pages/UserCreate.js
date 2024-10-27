import React from 'react';
import CreateUserForm from '../components/UserCreate.js'; // Aseg�rate de tener este componente

const CreateUserPage = () => {
    return (
        <div>
            <h1>Crear Nuevo Usuario</h1>
            <CreateUserForm /> {/* Este componente ser� responsable del formulario de creaci�n */}
        </div>
    );
};

export default CreateUserPage;
