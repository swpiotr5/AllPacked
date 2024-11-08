import React from 'react';
import { WiDaySunny} from 'react-icons/wi'; // Import ikon z React Icons
import CurrentConditions from './CurrConditions';
import sun from '../../assets/sun.png';
import NextFiveDays from './NextFiveDays';
import TodayForecast from './TodayForecast';
import ForecastDetails from './ForecastDetails';

const ForecastWrapper = () => {
    // Przykładowe wartości, które później podmienisz z API
    const sunriseTime = "6:00 AM";
    const sunsetTime = "8:00 PM";
    const windSpeed = "15 km/h";
    const rainAmount = "5 mm";
    const humidityLevel = "60%";
    const tempFelt = "25°C";
    const temperature = "27°C";
    const rainPossibility = "0%";
    const city = "Kraków";

    return (
        <div className='relative grid grid-cols-3 mt-12 p-4 gap-4 bg-custom-medium-blue items-center h-auto w-2/3 rounded-xl'>
            <div className="flex flex-col text-custom-white w-full h-full col-span-2">
                <ForecastDetails temperature={temperature} rainPossibility={rainPossibility} city={city}></ForecastDetails>
                <TodayForecast></TodayForecast>
                <NextFiveDays></NextFiveDays>
            </div>
            <CurrentConditions sunriseTime={sunriseTime} sunsetTime={sunsetTime} windSpeed={windSpeed} rainAmount={rainAmount} humidityLevel={humidityLevel} tempFelt={tempFelt}></CurrentConditions>
        </div>
    );
};

export default ForecastWrapper;