import axios from 'axios';

const API_URL = 'http://www.sgitdssp.somee.com/api/DriverControllers';

export const GetAllDrivers = async () => {
    try {
        const response = await axios.get(API_URL); // Asegúrate de reemplazar con la URL correcta de tu API
        return response.data; // Devuelve la lista de conductores
    } catch (error) {
        console.error("Error fetching drivers:", error);
        return []; // Devuelve un array vacío en caso de error
    }
}

export const GetDriverById = async (driverId) => {
    try {
        const response = await axios.get(`${API_URL}/${driverId}`); // Asegúrate de incluir la barra antes de driverId
        return response.data; // Asegúrate de devolver los datos correctos
    } catch (error) {
        console.error("Error fetching driver by id", error);
        throw error; // Lanza el error para que pueda ser manejado donde se llama
    }
};



export const CreateDriver = async (driver) => {
    const response = await fetch('http://www.sgitdssp.somee.com/api/DriverControllers/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(driver),
    });

    if (!response.ok) {
        throw new Error('Error al crear el conductor');
    }

    return await response.json(); // Devuelve el nuevo conductor creado
};

export const UpdateDriver = async (driverId, driverData) => {
    try {
        const response = await axios.put(`${API_URL}/${driverId}`, driverData); // Agregar "/" antes de driverId
        return response.data;
    } catch (error) {
        console.error("Error updating driver:", error);
        throw error; // Lanza el error para que pueda ser manejado en el componente
    }
};

export const DeleteDriver = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`); // Utiliza el método DELETE
        return true; // Retorna true si la eliminación fue exitosa
    } catch (error) {
        console.error("Error deleting driver:", error);
        return false; // Retorna false en caso de error
    }
};