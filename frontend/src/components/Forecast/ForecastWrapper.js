import React, { useEffect, useState } from 'react';
import CurrentConditions from './CurrConditions';
import NextFiveDays from './NextFiveDays';
import TodayForecast from './TodayForecast';
import ForecastDetails from './ForecastDetails';
import { getCurrentWeather } from '../../services/WeatherService';

const ForecastWrapper = ({trip}) => {
    const city = trip.city;
    const country = trip.country;

    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCurrentWeather = async () => {
            try {
                const currentWeather = await getCurrentWeather(city, country);
                setWeather(currentWeather);
                console.log(currentWeather)
            } catch (error) {
                setError('Error fetching weather data');
                console.error('Error fetching weather data:', error);
            }
        };
        

        if (city && country) {
            fetchCurrentWeather();
        }
    }, [city, country]);

    if (error) {
        return <div className="error mt-3 text-red-700 bg-red-100 border-l-4 border-red-500 p-3 rounded-lg shadow-md flex items-center space-x-3">
        <i className="fas fa-exclamation-circle text-red-500 text-xl"></i>
        <p className="text-sm font-medium">{error}</p>
    </div>;
    }

    if (!weather) {
        return <div>Loading...</div>;
    }
    
    const sunriseTime = new Date(weather.sys.sunrise * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    const sunsetTime = new Date(weather.sys.sunset * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    const windSpeed = `${weather.wind.speed} m/s`;
    const rainAmount = weather.rain ? `${weather.rain['1h']} mm` : '0 mm';
    const humidityLevel = `${weather.main.humidity}%`;
    const tempFelt = `${Math.round(weather.main.feels_like)}°C`;
    const temperature = `${Math.round(weather.main.temp)}°C`;
    const currConds = weather.weather[0].description;
    const weatherIcon = weather.weather[0].icon;

    return (
        <div className='relative grid grid-cols-3 mt-12 p-4 gap-4 bg-custom-medium-blue items-center h-auto w-2/3 rounded-xl'>
            <div className="flex flex-col text-custom-white w-full h-full col-span-2">
                <ForecastDetails temperature={temperature} currConds={currConds} city={city} weatherIcon={weatherIcon}></ForecastDetails>
                <TodayForecast></TodayForecast>
                <NextFiveDays></NextFiveDays>
            </div>
            <CurrentConditions sunriseTime={sunriseTime} sunsetTime={sunsetTime} windSpeed={windSpeed} rainAmount={rainAmount} humidityLevel={humidityLevel} tempFelt={tempFelt}></CurrentConditions>
        </div>
    );
};

export default ForecastWrapper;