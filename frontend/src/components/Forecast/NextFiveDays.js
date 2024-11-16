import React from 'react';

const NextFiveDays = ({nextFiveDaysForecast}) => {

    return (
        <div className="flex flex-col bg-custom-light-blue mt-5 p-3 w-full h-full rounded-xl">
            <p>next 5 days</p>
            <div className="grid grid-cols-5 gap-10 pt-4 pb-4 pl-2 pr-2 w-full h-full">
                <div className="flex flex-col justify-center items-center gap-2 bg-custom-lighter-blue rounded-xl">
                    <p>Tomorrow</p>
                    <img
                    src={`https://openweathermap.org/img/wn/${nextFiveDaysForecast[0].mostFrequentIcon}@2x.png`}
                    className="w-full h-1/2 object-cover"
                    />
                    <p>{nextFiveDaysForecast[0].averageTemp}</p>
                </div>
                <div className="flex flex-col justify-center items-center gap-2 bg-custom-lighter-blue rounded-xl">
                    <p>{nextFiveDaysForecast[1].dayOfWeek}</p>
                    <img
                    src={`https://openweathermap.org/img/wn/${nextFiveDaysForecast[1].mostFrequentIcon}@2x.png`}
                    className="w-full h-1/2 object-cover"
                    />
                    <p>{nextFiveDaysForecast[1].averageTemp}</p>
                </div>
                <div className="flex flex-col justify-center items-center gap-2 bg-custom-lighter-blue rounded-xl">
                    <p>{nextFiveDaysForecast[2].dayOfWeek}</p>
                    <img
                    src={`https://openweathermap.org/img/wn/${nextFiveDaysForecast[2].mostFrequentIcon}@2x.png`}
                    className="w-full h-1/2 object-cover"
                    />
                    <p>{nextFiveDaysForecast[2].averageTemp}</p>
                </div>
                <div className="flex flex-col justify-center items-center gap-2 bg-custom-lighter-blue rounded-xl">
                    <p>{nextFiveDaysForecast[3].dayOfWeek}</p>
                    <img
                    src={`https://openweathermap.org/img/wn/${nextFiveDaysForecast[3].mostFrequentIcon}@2x.png`}
                    className="w-full h-1/2 object-cover"
                    />
                    <p>{nextFiveDaysForecast[3].averageTemp}</p>
                </div>
                <div className="flex flex-col justify-center items-center gap-2 bg-custom-lighter-blue rounded-xl">
                    <p>{nextFiveDaysForecast[4].dayOfWeek}</p>
                    <img
                    src={`https://openweathermap.org/img/wn/${nextFiveDaysForecast[4].mostFrequentIcon}@2x.png`}
                    className="w-full h-1/2 object-cover"
                    />
                    <p>{nextFiveDaysForecast[4].averageTemp}</p>
                </div>
            </div>
        </div>
    );
};

export default NextFiveDays;