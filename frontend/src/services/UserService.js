import axios from 'axios';

export const register = async(data) => {
    try {
        const response = await axios.post('http://localhost:8000/register/', data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}