import axios from 'axios';

export const login = async (credentials) => {
    return await axios.post('http://www.sgitdssp.somee.com/api/UserControllers/login', credentials);
};
export const createUser = async (user) => {
    return await axios.post('http://www.sgitdssp.somee.com/api/UserControllers', user);
};