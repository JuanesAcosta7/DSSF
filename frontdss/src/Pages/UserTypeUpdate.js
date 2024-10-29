import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GetUserTypeById, UpdateUserType } from '../Service/UserTypeService.js';

const UpdateUserTypePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [userType, setUserType] = useState({
        UserTypeId: id,
        User: '', // Aquí puedes especificar el formato de tu usuario
        Rol: '', // Aquí puedes especificar el formato de tu rol
        ModifiedBy: ''
    });

    useEffect(() => {
        const fetchUserType = async () => {
            console.log("UserType ID from URL:", id);
            try {
                const fetchedUserType = await GetUserTypeById(id);
                if (fetchedUserType) {
                    setUserType(fetchedUserType);
                }
            } catch (error) {
                console.error("Error fetching user type:", error);
            }
        };
        fetchUserType();
    }, [id]);

    const handleChange = (e) => {
        setUserType({
            ...userType,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Updating user type with data:", userType);
            await UpdateUserType(id, userType);
            navigate('/user-types'); // Redirigir a la lista de tipos de usuario
        } catch (error) {
            console.error("Error updating user type:", error);
        }
    };

    return (
        <div>
            <h1>Actualizar Tipo de Usuario</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Usuario:</label>
                    <input
                        type="text"
                        name="User"
                        value={userType.User}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Rol:</label>
                    <input
                        type="text"
                        name="Rol"
                        value={userType.Rol}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Modificado por:</label>
                    <input
                        type="text"
                        name="ModifiedBy"
                        value={userType.ModifiedBy}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Actualizar Tipo de Usuario</button>
            </form>
        </div>
    );
};

export default UpdateUserTypePage;
