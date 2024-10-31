import React from 'react';
import sun from '../../assets/sun.png';

const NextFiveDays = () => {

    return (
        <div className="flex flex-col bg-custom-light-blue mt-5 p-3 w-full h-full rounded-xl">
            <p>next 5 days</p>
            <div className="grid grid-cols-5 gap-10 pt-4 pb-4 pl-2 pr-2 w-full h-full">
                <div className="flex flex-col justify-center items-center gap-2 bg-custom-lighter-blue rounded-xl">
                    <p>Tomorrow</p>
                    <img
                    src={sun}
                    className="w-1/4 object-cover"
                    />
                    <p>24°C</p>
                </div>
                <div className="flex flex-col justify-center items-center gap-2 bg-custom-lighter-blue rounded-xl">
                    <p>Wednesday</p>
                    <img
                    src={sun}
                    className="w-1/4 object-cover"
                    />
                    <p>24°C</p>
                </div>
                <div className="flex flex-col justify-center items-center gap-2 bg-custom-lighter-blue rounded-xl">
                    <p>Thursday</p>
                    <img
                    src={sun}
                    className="w-1/4 object-cover"
                    />
                    <p>24°C</p>
                </div>
                <div className="flex flex-col justify-center items-center gap-2 bg-custom-lighter-blue rounded-xl">
                    <p>Friday</p>
                    <img
                    src={sun}
                    className="w-1/4 object-cover"
                    />
                    <p>24°C</p>
                </div>
                <div className="flex flex-col justify-center items-center gap-2 bg-custom-lighter-blue rounded-xl">
                    <p>Saturday</p>
                    <img
                    src={sun}
                    className="w-1/4 object-cover"
                    />
                    <p>24°C</p>
                </div>
            </div>
        </div>
    );
};

export default NextFiveDays;