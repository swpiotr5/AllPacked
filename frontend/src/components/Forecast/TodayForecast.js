import React from 'react';
import sun from '../../assets/sun.png';

const TodayForecast = () => {

    return (
                <div className="flex flex-col bg-custom-light-blue p-3 w-full h-full rounded-xl">
                    <p>Today</p>
                    <div className="grid grid-cols-5 gap-10 pt-4 pb-4 pl-2 pr-2 w-full h-full">
                        <div className="flex flex-col justify-center items-center gap-2 bg-custom-lighter-blue rounded-xl">
                            <p>6 AM</p>
                            <img
                            src={sun}
                            className="w-1/4 object-cover"
                            />
                            <p>24°C</p>
                        </div>
                        <div className="flex flex-col justify-center items-center gap-2 bg-custom-lighter-blue rounded-xl">
                            <p>9 AM</p>
                            <img
                            src={sun}
                            className="w-1/4 object-cover"
                            />
                            <p>24°C</p>
                        </div>
                        <div className="flex flex-col justify-center items-center gap-2 bg-custom-lighter-blue rounded-xl">
                            <p>12 PM</p>
                            <img
                            src={sun}
                            className="w-1/4 object-cover"
                            />
                            <p>24°C</p>
                        </div>
                        <div className="flex flex-col justify-center items-center gap-2 bg-custom-lighter-blue rounded-xl">
                            <p>3 PM</p>
                            <img
                            src={sun}
                            className="w-1/4 object-cover"
                            />
                            <p>24°C</p>
                        </div>
                        <div className="flex flex-col justify-center items-center gap-2 bg-custom-lighter-blue rounded-xl">
                            <p>6 PM</p>
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

export default TodayForecast;