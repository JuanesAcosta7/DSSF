import axios from 'axios';

const API_URL = 'https://www.sgitdssp.somee.com/api/UserTypeControllers';

export const GetAllUserTypes = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching user types:", error);
        return [];
    }
};

export const GetUserTypeById = async (userTypeId) => {
    try {
        const response = await axios.get(`${API_URL}/${userTypeId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user type by id:", error.response ? error.response.data : error.message);
        throw error;
    }
};

export const CreateUserType = async (userType) => {
    try {
        const response = await fetch(`${API_URL}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userType),
        });

        if (!response.ok) {
            const errorDetails = await response.json();
            throw new Error(`Error al crear el tipo de usuario: ${errorDetails.message || 'Error desconocido'}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error creando tipo de usuario:", error);
        throw error;
    }
};

export const UpdateUserType = async (userTypeId, userTypeData) => {
    try {
        const response = await axios.put(`${API_URL}/${userTypeId}`, userTypeData);
        return response.data;
    } catch (error) {
        console.error("Error updating user type:", error);
        throw error;
    }
};

export const DeleteUserType = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
        return true;
    } catch (error) {
        console.error("Error deleting user type:", error);
        return false;
    }
};
