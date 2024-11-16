import React, { useEffect, useState } from 'react';
import CurrentConditions from './CurrConditions';
import NextFiveDays from './NextFiveDays';
import TodayForecast from './TodayForecast';
import ForecastDetails from './ForecastDetails';
import { getCurrentWeather, getForecastFiveDays } from '../../services/WeatherService';

const ForecastWrapper = ({trip}) => {
    const city = trip?.city || '';
    const country = trip?.country || '';

    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCurrentWeather = async () => {
            try {
                const currentWeather = await getCurrentWeather(city, country);
                setWeather(currentWeather);
            } catch (error) {
                setError('Error fetching weather data');
                console.error('Error fetching weather data:', error);
            }
        };

        const fetchForecastFiveDays = async () => {
            try {
                const forecastFiveDays = await getForecastFiveDays(city, country);
                setForecast(forecastFiveDays);
            } catch (error) {
                setError('Error fetching forecast data');
                console.error('Error fetching forecast data:', error);
            }
        };
        
        if (city && country) {
            fetchCurrentWeather();
            fetchForecastFiveDays();
        };

    }, [city, country]);

    if (error) {
        return <div className="error mt-3 text-red-700 bg-red-100 border-l-4 border-red-500 p-3 rounded-lg shadow-md flex items-center space-x-3">
        <i className="fas fa-exclamation-circle text-red-500 text-xl"></i>
        <p className="text-sm font-medium">{error}</p>
    </div>;
    }

    if (!weather || !forecast) {
        return <div className="error mt-3 bg-yellow-100 border-l-4 border-yellow-500 p-3 rounded-lg shadow-md flex items-center space-x-3">
        <p className="text-sm font-medium">Loading...</p>
    </div>;
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

    const todayForecastParameters = forecast.list
    ? forecast.list.slice(0, 5).map(item => {
        const date = new Date(item.dt * 1000);
        const time = new Intl.DateTimeFormat('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        }).format(date);
  
        return {
          time, 
          icon: item.weather[0].icon,
          temperature: `${Math.round(item.main.temp)}°C`,
        };
      })
    : [];
  
    const groupedForecast = forecast.list.reduce((acc, item) => {
        const date = new Date(item.dt * 1000);
        const day = date.getUTCDate();
        const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });

        if (!acc[day]) {
            acc[day] = {
                dayOfWeek,
                temperatures: [],
                icons: []
            };
        }

        acc[day].temperatures.push(item.main.temp);
        acc[day].icons.push(item.weather[0].icon);

        return acc;
    }, {});
    const today = new Date().getUTCDate();
    const nextFiveDaysForecast = Object.values(groupedForecast)
    .filter(day => day.dayOfWeek !== today)
    .slice(0, 5)
    .map(day => {
        const averageTemp = day.temperatures.reduce((sum, temp) => sum + temp, 0) / day.temperatures.length;
        const iconFrequency = day.icons.reduce((acc, icon) => {
            if (icon.endsWith('d')) {
                acc[icon] = (acc[icon] || 0) + 1;
            }
            return acc;
        }, {});
        const mostFrequentIcon = Object.keys(iconFrequency).reduce((a, b) => iconFrequency[a] > iconFrequency[b] ? a : b);

        return {
            dayOfWeek: day.dayOfWeek,
            averageTemp: `${Math.round(averageTemp)}°C`,
            mostFrequentIcon
        };
    });


    return (
        <div className='relative grid grid-cols-3 mt-12 mb-5 p-4 gap-4 bg-custom-medium-blue items-center h-auto w-2/3 rounded-xl'>
            <div className="flex flex-col text-custom-white w-full h-full col-span-2">
                <ForecastDetails temperature={temperature} currConds={currConds} city={city} weatherIcon={weatherIcon}></ForecastDetails>
                <TodayForecast todayForecastParameters={todayForecastParameters}></TodayForecast>
                <NextFiveDays nextFiveDaysForecast={nextFiveDaysForecast}></NextFiveDays>
            </div>
            <CurrentConditions sunriseTime={sunriseTime} sunsetTime={sunsetTime} windSpeed={windSpeed} rainAmount={rainAmount} humidityLevel={humidityLevel} tempFelt={tempFelt}></CurrentConditions>
        </div>
    );
};

export default ForecastWrapper;


