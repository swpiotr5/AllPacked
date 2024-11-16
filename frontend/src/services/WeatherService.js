import axios from 'axios';
import { getCode } from 'country-list';

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
const BASE_URL = process.env.REACT_APP_OPENWEATHER_BASE_URL;

export const getCurrentWeather = async (city, country) => {
    try {
        const countryCode = getCode(country);
        const location = countryCode ? `${city},${countryCode}` : city;

        const response = await axios.get(`${BASE_URL}/weather`, {
            params: {
                q: location,
                appid: API_KEY,
                units: 'metric'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
}

export const getForecastFiveDays = async (city, country) => {
    try {
        const countryCode = getCode(country);
        if (!countryCode) {
            throw new Error(`Invalid country name: ${country}`);
        }
        const response = await axios.get(`${BASE_URL}/forecast`, {
            params: {
                q: `${city},${countryCode}`,
                appid: API_KEY,
                units: 'metric'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
}