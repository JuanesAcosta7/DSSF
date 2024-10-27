import React from 'react';
import CreateUserForm from '../components/UserCreate.js'; // Asegúrate de tener este componente

const CreateUserPage = () => {
    return (
        <div>
            <h1>Crear Nuevo Usuario</h1>
            <CreateUserForm /> {/* Este componente será responsable del formulario de creación */}
        </div>
    );
};

export default CreateUserPage;
