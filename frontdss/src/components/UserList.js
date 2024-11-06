import React, { useEffect, useState } from 'react';
import { GetAllUsers, DeleteUser } from '../Service/UserService.js';
import { Link, useNavigate } from 'react-router-dom';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await GetAllUsers();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
        if (confirmDelete) {
            const result = await DeleteUser(id);
            if (result) {
                setUsers(users.filter(user => user.userId !== id));
            } else {
                alert("Error al eliminar el usuario");
            }
        }
    };

    const handleEdit = (id) => {
        navigate(`/update-user/${id}`);
    };

    return (
        <div className="driver-list-container">
            <h2>Lista de Usuarios</h2>
            <button onClick={() => navigate('/create-user')} className="add-button">Agregar Usuario</button>
            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nombre del Usuario</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.userId}>
                                <td>
                                    <Link to={`/users/${user.userId}`} className="table-link">{user.name}</Link>
                                </td>
                                <td className="table-actions">
                                    <button onClick={() => handleEdit(user.userId)} className="update-button">Actualizar</button>
                                    <button onClick={() => handleDelete(user.userId)} className="delete-button">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserList;
