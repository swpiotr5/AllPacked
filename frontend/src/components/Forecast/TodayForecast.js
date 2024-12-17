import React from 'react';

const TodayForecast = ({ todayForecastParameters }) => {
    return (
        <div className="flex flex-col bg-custom-light-blue p-4 w-full h-full rounded-xl shadow-lg">
            <h2 className="text-md text-custom-white mb-3">Today</h2>
            <div className="grid grid-cols-5 gap-4">
                {todayForecastParameters.map((param, index) => (
                    <div key={index} className="flex flex-col justify-center items-center gap-2 bg-custom-blue rounded-xl p-3 shadow-md">
                        <p className="text-sm font-semibold text-custom-white">{param.time}</p>
                        <img
                            src={`https://openweathermap.org/img/wn/${param.icon}@2x.png`}
                            alt="weather icon"
                            className="w-12 h-12"
                        />
                        <p className="text-lg font-bold text-custom-white">{param.temperature}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TodayForecast;