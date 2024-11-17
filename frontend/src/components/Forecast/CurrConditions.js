import React from 'react';
import { WiSunrise, WiSunset, WiStrongWind, WiRain, WiHumidity, WiThermometer } from 'react-icons/wi'; 

const CurrentConditions = ({sunriseTime, sunsetTime, windSpeed, rainAmount, humidityLevel, tempFelt}) => {

    return (
            <div className="flex flex-col w-full h-full bg-custom-light-blue opacity-90 text-custom-white rounded-xl p-5">
                <p>Current conditions</p>
                <div className="grid grid-cols-2 gap-10 h-full m-5">
                    <div className="bg-blue w-full h-full col-start-1 flex flex-col bg-custom-blue items-center justify-center rounded-xl">
                        <WiSunrise className="text-4xl" />
                        <p className="text-lg mt-2 mb-2">{sunriseTime}</p>
                        <p>Sunrise</p>
                    </div>
                    <div className="bg-blue w-full h-full col-start-2 flex flex-col bg-custom-blue items-center justify-center rounded-xl">
                        <WiSunset className="text-4xl" />
                        <p className="text-lg mt-2 mb-2">{sunsetTime}</p>
                        <p>Sunset</p>
                    </div>
                    <div className="bg-blue w-full h-full col-start-1 flex flex-col bg-custom-blue items-center justify-center rounded-xl">
                        <WiStrongWind className="text-4xl" />
                        <p className="text-lg mt-2 mb-2">{windSpeed}</p>
                        <p>Wind</p>
                    </div>
                    <div className="bg-blue w-full h-full col-start-2 flex flex-col bg-custom-blue items-center justify-center rounded-xl">
                        <WiRain className="text-4xl" />
                        <p className="text-lg mt-2 mb-2">{rainAmount}</p>
                        <p>Rain</p>
                    </div>
                    <div className="bg-blue w-full h-full col-start-1 flex flex-col bg-custom-blue items-center justify-center rounded-xl">
                        <WiHumidity className="text-4xl" />
                        <p className="text-lg mt-2 mb-2">{humidityLevel}</p>
                        <p>Humidity</p>
                    </div>
                    <div className="bg-blue w-full h-full col-start-2 flex flex-col bg-custom-blue items-center justify-center rounded-xl">
                        <WiThermometer className="text-4xl" />
                        <p className="text-lg mt-2 mb-2">{tempFelt}</p>
                        <p>Temp Felt</p>
                    </div>
                </div>
            </div>
    );
};

export default CurrentConditions;