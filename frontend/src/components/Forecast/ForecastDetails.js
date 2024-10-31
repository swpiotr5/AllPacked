import React from 'react';
import sun from '../../assets/sun.png';

const ForecastDetails = ({city, rainPossibility, temperature}) => {

    return (
        <div className="grid grid-cols-4 m-10">
            <div className='col-span-2 w-full'>
                <p>Your location:</p>
                <p className="mt-4 mb-4 text-4xl tracking-wide font-bold">{city}</p>
                <p>Rain possibility: {rainPossibility}</p>
            </div>
            <div className='flex col-span-1 justify-center p-5 w-full'>
                <p className="text-5xl font-bold">{temperature}</p>
            </div>
            <div className="col-span-1 w-full pl-5 pr-5">
                <img
                    src={sun}
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
};

export default ForecastDetails;