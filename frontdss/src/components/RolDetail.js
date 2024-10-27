import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GetRoleById } from '../Service/RolService.js';

const RoleDetail = () => {
    const { Id } = useParams();
    const [rol, setRol] = useState(null);

    useEffect(() => {
        const fetchRole = async () => {
            console.log("ID del rol:", Id);
            const result = await GetRoleById(Id);
            setRol(result);
        };
        fetchRole();
    }, [Id]);

    if (!rol) return <div>Cargando...</div>;

    return (
        <div>
            <h2>Detalles del Rol</h2>
            <p>Nombre: {rol.rol}</p>
            <p>Modificado por: {rol.modifiedBy}</p>
        </div>
    );
};

export default RoleDetail;
