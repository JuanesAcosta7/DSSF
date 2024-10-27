import axios from 'axios';

const API_URL = 'http://www.sgitdssp.somee.com/api/DriverControllers';

export const GetAllDrivers = async () => {
    try {
        const response = await axios.get(API_URL); 
        return response.data; 
    } catch (error) {
        console.error("Error fetching drivers:", error);
        return []; 
    }
}

export const GetDriverById = async (driverId) => {
    try {
        const response = await axios.get(`${API_URL}/${driverId}`); 
        return response.data; 
    } catch (error) {
        console.error("Error fetching driver by id", error);
        throw error; 
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

    return await response.json(); 
};

export const UpdateDriver = async (driverId, driverData) => {
    try {
        const response = await axios.put(`${API_URL}/${driverId}`, driverData); 
        return response.data;
    } catch (error) {
        console.error("Error updating driver:", error);
        throw error; 
    }
};

export const DeleteDriver = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`); 
        return true; 
    } catch (error) {
        console.error("Error deleting driver:", error);
        return false; 
    }
};