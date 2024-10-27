import axios from 'axios';

const API_URL = 'http://www.sgitdssp.somee.com/api/InfractionControllers';

export const GetAllInfractions = async () => {
    try {
        const response = await axios.get(API_URL); 
        return response.data;
    } catch (error) {
        console.error("Error fetching infractions:", error);
        return []; 
    }
};

export const GetInfractionById = async (infractionId) => {
    try {
        const response = await axios.get(`${API_URL}/${infractionId}`); 
        return response.data;
    } catch (error) {
        console.error("Error fetching infraction by id", error);
        throw error; 
    }
};

export const CreateInfraction = async (infraction) => {
    try {
        const response = await axios.post(API_URL, infraction, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data; 
    } catch (error) {
        console.error("Error creating infraction:", error);
        throw error;
    }
};

export const UpdateInfraction = async (infractionId, infractionData) => {
    try {
        const response = await axios.put(`${API_URL}/${infractionId}`, infractionData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data; 
    } catch (error) {
        console.error("Error updating infraction:", error);
        throw error;
    }
};

export const DeleteInfraction = async (infractionId) => {
    try {
        await axios.delete(`${API_URL}/${infractionId}`); 
        return true; 
    } catch (error) {
        console.error("Error deleting infraction:", error);
        return false; 
    }
};
