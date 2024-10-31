import axios from 'axios';
const API_URL = 'https://www.sgitdssp.somee.com/api/UserControllers';

export const login = async (credentials) => {
    return await axios.post('https://www.sgitdssp.somee.com/api/UserControllers/login', credentials);
};
export const createUser = async (user) => {
    return await axios.post('https://www.sgitdssp.somee.com/api/UserControllers', user);
};
export const GetAllUsers = async () => {
    try {
        const response = await axios.get(API_URL); 
        return response.data; 
    } catch (error) {
        console.error("Error fetching users:", error);
        return []; 
    }
}
export const GetUserById = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/${userId}`); 
        return response.data; 
    } catch (error) {
        console.error("Error fetching user by id", error);
        throw error; 
    }
};
export const UpdateUser = async (userId, userData) => {
    try {
        const response = await axios.put(`${API_URL}/${userId}`, userData);
        return response.data;
    } catch (error) {
        console.error("Error updating user:", error);
        throw error; 
    }
}; export const DeleteUser = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`); 
        return true;
    } catch (error) {
        console.error("Error deleting user:", error);
        return false; 
    }
};