import React from 'react';

const TripFormSecondStep = ({ date, tripDuration, plannedBudget, onHandlePlannedBudgetChange, onHandleDateChange, onHandleTripDurationChange}) => {
    return (
        <div>
                <div className="w-full flex flex-col gap-10 items-center justify-center">
                    <label className="text-1xl text-custom-white flex items-center flex-col w-1/3">
                        Provide trip date
                        <input
                            type="date"
                            id="date"
                            value={date}
                            onChange={onHandleDateChange}
                            placeholder=""
                            className="p-2 pl-7 mt-5 bg-input-lower-opacity rounded-xl shadow-2xl w-full text-sm input-placeholder text-custom-white"
                        />
                    </label>
                    <label className="text-1xl text-custom-white flex items-center flex-col w-1/3">
                        Provide trip duration
                        <input
                            type="number"
                            id="tripDuration"
                            value={tripDuration}
                            onChange={onHandleTripDurationChange}
                            placeholder="trip duration here.."
                            className="p-2 pl-7 mt-5 bg-input-lower-opacity rounded-xl shadow-2xl w-full text-sm input-placeholder text-custom-white"
                        />
                    </label>
                    <label className="text-1xl text-custom-white flex items-center flex-col w-1/3">
                        How much money do you plan to spend during trip?
                        <input
                            type="number"
                            id="plannedBudget"
                            value={plannedBudget}
                            onChange={onHandlePlannedBudgetChange}
                            placeholder="planned budget here.."
                            className="p-2 pl-7 mt-5 bg-input-lower-opacity rounded-xl shadow-2xl w-full text-sm input-placeholder text-custom-white"
                        />
                    </label>
                </div>
        </div>
    );
};

export default TripFormSecondStep;