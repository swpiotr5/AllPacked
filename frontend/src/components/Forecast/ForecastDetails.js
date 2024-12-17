import React from 'react';

const ForecastDetails = ({ city, currConds, temperature, weatherIcon }) => {
    const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

    return (
        <div className="grid grid-cols-4 gap-4 p-5 mb-5 rounded-xl ">
            <div className='col-span-2 flex flex-col justify-center'>
                <p className="text-sm text-custom-white">Your location:</p>
                <p className="mt-2 mb-2 text-3xl tracking-wide font-bold text-custom-white">{city}</p>
                <p className="text-sm text-custom-white">Currently: {currConds}</p>
            </div>
            <div className='flex col-span-1 justify-center items-center'>
                <p className="text-6xl font-bold text-custom-white">{temperature}</p>
            </div>
            <div className="col-span-1 flex justify-center items-center">
                <img
                    src={iconUrl}
                    alt="Weather icon"
                    className="w-24 h-24"
                />
            </div>
        </div>
    );
};

export default ForecastDetails;