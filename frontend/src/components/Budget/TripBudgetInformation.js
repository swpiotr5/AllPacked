import React from 'react';

const TripBudgetInformation = () => {
    const city = "Roma";
    const date = "July";
    const plannedBudget = "4000$";
    const spentBudget = "3000$";
    const remainingBudget = parseInt(plannedBudget) - parseInt(spentBudget);
    const progressPercentage = (parseInt(remainingBudget) / parseInt(plannedBudget)).toFixed(4) * 100;

    const getProgressBarColor = (percentage) => {
        if (percentage > 50) {
            return 'bg-green-600';
        } else if (percentage > 25) {
            return 'bg-yellow-500';
        } else {
            return 'bg-red-600';
        }
    };

    return (
        <div className="max-w-screen-xl w-full flex justify-center items-center mt-12 flex-col text-custom-white uppercase tracking-wide font-semibold">
            <div className="">
                <p className="text-3xl">{city} - {date} trip</p>
            </div>
            <div className="w-full flex justify-around mt-5">
                <div className="flex justify-center items-center rounded-xl w-2/6 text-xl bg-custom-blue h-10">
                    <p>planned budget: {plannedBudget}</p>
                </div>
                <div className="flex justify-center items-center rounded-xl w-2/6 text-xl bg-custom-blue h-10">
                    <p>spent budget: {spentBudget}</p>
                </div>
            </div>
            <div className="w-2/3 mt-10 flex flex-col items-center text-xl">
                <p>Money left: {remainingBudget}$</p>
                <div className="flex w-full items-center pl-1 pr-1 mt-3 h-10 rounded-full overflow-hidden bg-custom-white" role="progressbar" aria-valuenow={progressPercentage} aria-valuemin="0" aria-valuemax="100">
                    <div className={`flex flex-col h-8 justify-center rounded-full overflow-hidden text-xs text-white text-center whitespace-nowrap transition duration-500 ${getProgressBarColor(progressPercentage)}`} style={{ width: `${progressPercentage}%` }}>
                        {progressPercentage}%
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TripBudgetInformation;