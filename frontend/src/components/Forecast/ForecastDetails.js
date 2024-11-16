import React from 'react';
const ForecastDetails = ({city, currConds, temperature, weatherIcon}) => {
    const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

    return (
        <div className="grid grid-cols-4 m-10">
            <div className='col-span-2 w-full'>
                <p>Your location:</p>
                <p className="mt-4 mb-4 text-4xl tracking-wide font-bold">{city}</p>
                <p>currently: {currConds}</p>
            </div>
            <div className='flex col-span-1 justify-center p-3 w-full'>
                <p className="text-5xl font-bold">{temperature}</p>
            </div>
            <div className="col-span-1 w-full">
                <img
                    src={iconUrl}
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
};

export default ForecastDetails;