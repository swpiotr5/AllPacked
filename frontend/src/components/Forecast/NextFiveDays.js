import React from 'react';

const NextFiveDays = ({ nextFiveDaysForecast }) => {
    return (
        <div className="flex flex-col bg-custom-light-blue mt-3 p-3 w-full h-full rounded-xl shadow-lg">
            <h2 className="text-sm text-custom-white mb-3">Next 5 Days</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {nextFiveDaysForecast.map((day, index) => (
                    <div key={index} className="flex flex-row md:flex-col justify-center items-center gap-1 bg-custom-blue rounded-xl p-3 shadow-md">
                        <p className="text-md font-semibold text-custom-white">{index === 0 ? 'Tomorrow' : day.dayOfWeek}</p>
                        <p className="text-xs text-custom-white">{day.date}</p>
                        <img
                            src={`https://openweathermap.org/img/wn/${day.mostFrequentIcon}@2x.png`}
                            alt="weather icon"
                            className="w-12 h-12"
                        />
                        <p className="text-lg font-bold text-custom-white">{day.averageTemp}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NextFiveDays;