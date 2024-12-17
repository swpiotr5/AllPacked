import React from 'react';
import { WiSunrise, WiSunset, WiStrongWind, WiRain, WiHumidity, WiThermometer } from 'react-icons/wi'; 

const CurrentConditions = ({sunriseTime, sunsetTime, windSpeed, rainAmount, humidityLevel, tempFelt}) => {
    return (
        <div className="flex flex-col w-full h-full bg-custom-light-blue opacity-90 text-custom-white rounded-xl p-4 shadow-lg">
            <h2 className="text-md text-custom-white mb-3">Current Conditions</h2>
            <div className="grid grid-cols-2 gap-4 h-full">
                <div className="flex flex-col items-center justify-center bg-custom-blue rounded-xl p-3 shadow-md">
                    <WiSunrise className="text-5xl" />
                    <p className="text-lg mt-2 mb-1">{sunriseTime}</p>
                    <p className="text-sm">Sunrise</p>
                </div>
                <div className="flex flex-col items-center justify-center bg-custom-blue rounded-xl p-3 shadow-md">
                    <WiSunset className="text-5xl" />
                    <p className="text-lg mt-2 mb-1">{sunsetTime}</p>
                    <p className="text-sm">Sunset</p>
                </div>
                <div className="flex flex-col items-center justify-center bg-custom-blue rounded-xl p-3 shadow-md">
                    <WiStrongWind className="text-5xl" />
                    <p className="text-lg mt-2 mb-1">{windSpeed}</p>
                    <p className="text-sm">Wind</p>
                </div>
                <div className="flex flex-col items-center justify-center bg-custom-blue rounded-xl p-3 shadow-md">
                    <WiRain className="text-5xl" />
                    <p className="text-lg mt-2 mb-1">{rainAmount}</p>
                    <p className="text-sm">Rain</p>
                </div>
                <div className="flex flex-col items-center justify-center bg-custom-blue rounded-xl p-3 shadow-md">
                    <WiHumidity className="text-5xl" />
                    <p className="text-lg mt-2 mb-1">{humidityLevel}</p>
                    <p className="text-sm">Humidity</p>
                </div>
                <div className="flex flex-col items-center justify-center bg-custom-blue rounded-xl p-3 shadow-md">
                    <WiThermometer className="text-5xl" />
                    <p className="text-lg mt-2 mb-1">{tempFelt}</p>
                    <p className="text-sm">Temp Felt</p>
                </div>
            </div>
        </div>
    );
};

export default CurrentConditions;