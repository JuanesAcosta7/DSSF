import axios from 'axios';

const API_URL = 'http://www.sgitdssp.somee.com/api/VehicleControllers'; 


export const GetAllVehicles = async () => {
    try {
        const response = await axios.get(API_URL); 
        return response.data;
    } catch (error) {
        console.error("Error fetching vehicles:", error);
        return []; 
    }
};

export const GetVehicleById = async (vehicleId) => {
    try {
        const response = await axios.get(`${API_URL}/${vehicleId}`); 
        return response.data;
    } catch (error) {
        console.error("Error fetching vehicle by id", error);
        throw error; 
    }
};


export const CreateVehicle = async (vehicle) => {
    try {
        const response = await axios.post(API_URL, vehicle, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data; 
    } catch (error) {
        console.error("Error creating vehicle:", error);
        throw error; 
    }
};


export const UpdateVehicle = async (vehicleId, vehicleData) => {
    try {
        const response = await axios.put(`${API_URL}/${vehicleId}`, vehicleData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data; 
    } catch (error) {
        console.error("Error updating vehicle:", error);
        throw error; 
    }
};

export const DeleteVehicle = async (vehicleId) => {
    try {
        await axios.delete(`${API_URL}/${vehicleId}`); 
        return true; 
    } catch (error) {
        console.error("Error deleting vehicle:", error);
        return false; 
    }
};
