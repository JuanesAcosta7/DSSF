import axios from 'axios';
const API_URL = 'http://www.sgitdssp.somee.com/api/UserControllers';

export const login = async (credentials) => {
    return await axios.post('http://www.sgitdssp.somee.com/api/UserControllers/login', credentials);
};
export const createUser = async (user) => {
    return await axios.post('http://www.sgitdssp.somee.com/api/UserControllers', user);
};
export const GetAllUsers = async () => {
    try {
        const response = await axios.get(API_URL); // Asegúrate de reemplazar con la URL correcta de tu API
        return response.data; // Devuelve la lista de conductores
    } catch (error) {
        console.error("Error fetching users:", error);
        return []; // Devuelve un array vacío en caso de error
    }
}
export const GetUserById = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/${userId}`); // Asegúrate de incluir la barra antes de driverId
        return response.data; // Asegúrate de devolver los datos correctos
    } catch (error) {
        console.error("Error fetching user by id", error);
        throw error; // Lanza el error para que pueda ser manejado donde se llama
    }
};
export const UpdateUser = async (userId, userData) => {
    try {
        const response = await axios.put(`${API_URL}/${userId}`, userData); // Agregar "/" antes de driverId
        return response.data;
    } catch (error) {
        console.error("Error updating user:", error);
        throw error; // Lanza el error para que pueda ser manejado en el componente
    }
}; export const DeleteUser = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`); // Utiliza el método DELETE
        return true; // Retorna true si la eliminación fue exitosa
    } catch (error) {
        console.error("Error deleting user:", error);
        return false; // Retorna false en caso de error
    }
};