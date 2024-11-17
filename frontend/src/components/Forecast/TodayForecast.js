import React from 'react';

const TodayForecast = ({todayForecastParameters}) => {
    return (
                <div className="flex flex-col bg-custom-light-blue p-3 w-full h-full rounded-xl">
                    <p>Today</p>
                    <div className="grid grid-cols-5 gap-10 pt-2 pb-4 pl-2 pr-2 w-full h-full">
                        <div className="flex flex-col justify-center items-center bg-custom-blue rounded-xl">
                            <p>{todayForecastParameters[0].time}</p>
                            <img
                            src={`https://openweathermap.org/img/wn/${todayForecastParameters[0].icon}@2x.png`}
                            className="w-full h-1/2 object-cover"
                            />
                            <p>{todayForecastParameters[0].temperature}</p>
                        </div>
                        <div className="flex flex-col justify-center items-center bg-custom-blue rounded-xl">
                            <p>{todayForecastParameters[1].time}</p>
                            <img
                            src={`https://openweathermap.org/img/wn/${todayForecastParameters[1].icon}@2x.png`}
                            className="w-full h-1/2 object-cover"
                            />
                            <p>{todayForecastParameters[1].temperature}</p>
                        </div>
                        <div className="flex flex-col justify-center items-center bg-custom-blue rounded-xl">
                            <p>{todayForecastParameters[2].time}</p>
                            <img
                            src={`https://openweathermap.org/img/wn/${todayForecastParameters[2].icon}@2x.png`}
                            className="w-full h-1/2 object-cover"
                            />
                            <p>{todayForecastParameters[2].temperature}</p>
                        </div>
                        <div className="flex flex-col justify-center items-center bg-custom-blue rounded-xl">
                            <p>{todayForecastParameters[3].time}</p>
                            <img
                            src={`https://openweathermap.org/img/wn/${todayForecastParameters[3].icon}@2x.png`}
                            className="w-full h-1/2 object-cover"
                            />
                            <p>{todayForecastParameters[3].temperature}</p>
                        </div>
                        <div className="flex flex-col justify-center items-center bg-custom-blue rounded-xl">
                            <p>{todayForecastParameters[4].time}</p>
                            <img
                            src={`https://openweathermap.org/img/wn/${todayForecastParameters[4].icon}@2x.png`}
                            className="w-full h-1/2 object-cover"
                            />
                            <p>{todayForecastParameters[4].temperature}</p>
                        </div>
                    </div>
                </div>
    );
};

export default TodayForecast;