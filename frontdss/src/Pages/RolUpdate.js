import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GetRoleById, UpdateRole } from '../Service/RolService.js';

const UpdateRolePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [role, setRole] = useState({
        RolName: '',
        ModifiedBy: ''
    });

    useEffect(() => {
        const fetchRole = async () => {
            console.log("Role ID from URL:", id);
            try {
                const fetchedRole = await GetRoleById(id);
                if (fetchedRole) {
                    setRole(fetchedRole);
                }
            } catch (error) {
                console.error("Error fetching role:", error);
            }
        };
        fetchRole();
    }, [id]);

    const handleChange = (e) => {
        setRole({
            ...role,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Updating role with data:", role);
            await UpdateRole(id, role);
            navigate('/roles');
        } catch (error) {
            console.error("Error updating role:", error);
        }
    };

    return (
        <div>
            <h1>Actualizar Rol</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre del Rol:</label>
                    <input
                        type="text"
                        name="RolName"
                        value={role.RolName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Modificado por:</label>
                    <input
                        type="text"
                        name="ModifiedBy"
                        value={role.ModifiedBy}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Actualizar Rol</button>
            </form>
        </div>
    );
};

export default UpdateRolePage;
