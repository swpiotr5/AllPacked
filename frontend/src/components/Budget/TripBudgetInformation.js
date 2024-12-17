import React from 'react';

const TripBudgetInformation = ({ trip, budget }) => {
  const tripName = trip.tripName;
  const plannedBudget = `${budget.plannedBudget} ${budget.currency}`;
  const spentBudget = `${budget.spentBudget} ${budget.currency}`;
  const remainingBudget = (parseFloat(budget.plannedBudget) - parseFloat(budget.spentBudget)).toFixed(1);
  const progressPercentage = ((parseFloat(remainingBudget) / parseFloat(budget.plannedBudget)) * 100).toFixed(1);

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
    <div className="max-w-screen-xl w-full flex flex-col justify-center items-center mt-12 text-custom-white uppercase tracking-wide font-semibold p-4">
      <div className="text-center">
        <p className="text-2xl md:text-3xl">{tripName} trip</p>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 justify-items-center mt-5 gap-4">
        <div className="flex justify-center items-center rounded-xl w-full md:w-2/3 text-lg md:text-xl bg-custom-blue h-10 p-2">
          <p>planned budget: {plannedBudget}</p>
        </div>
        <div className="flex justify-center items-center rounded-xl w-full md:w-2/3 text-lg md:text-xl bg-custom-blue h-10 p-2">
          <p>spent budget: {spentBudget}</p>
        </div>
      </div>
      <div className="w-full md:w-2/3 mt-10 flex flex-col items-center text-lg md:text-xl">
        <p>Money left: {remainingBudget} {budget.currency}</p>
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