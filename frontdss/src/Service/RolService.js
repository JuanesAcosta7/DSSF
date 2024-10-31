import axios from 'axios';

const API_URL = 'https://www.sgitdssp.somee.com/api/RolControllers';

export const GetAllRoles = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching roles:", error);
        return [];
    }
};

export const GetRoleById = async (rolId) => {
    try {
        const response = await axios.get(`${API_URL}/${rolId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching role by id:", error.response ? error.response.data : error.message);
        throw error;
    }
};

export const CreateRole = async (role) => {
    try {
        const response = await fetch(`${API_URL}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(role),
        });

        if (!response.ok) {
            const errorDetails = await response.json(); 
            throw new Error(`Error al crear el rol: ${errorDetails.message || 'Error desconocido'}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error creando rol:", error);
        throw error; 
    }
};
export const UpdateRole = async (rolId, roleData) => {
    try {
        const response = await axios.put(`${API_URL}/${rolId}`, roleData);
        return response.data;
    } catch (error) {
        console.error("Error updating role:", error);
        throw error;
    }
};

export const DeleteRole = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
        return true;
    } catch (error) {
        console.error("Error deleting role:", error);
        return false;
    }
};
