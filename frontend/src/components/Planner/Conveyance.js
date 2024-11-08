import React from 'react';

const Conveyance = ({transportMean}) => {

    return (
        <div className="flex flex-col p-5 w-full bg-custom-dark-blue gap-2 rounded-xl">
            <div>
                <span className="font-bold text-custom-blue">name: </span>
                <span>{transportMean.name}</span>
            </div>
            <div>
                <span className="font-bold text-custom-blue">affordability: </span>
                <span>{transportMean.affordability}</span> 
            </div>
            <div>
                <span className="font-bold text-custom-blue">approximate_cost: </span>
                <span>{transportMean.approximate_cost}</span> 
            </div>
            <div>
                <span className="font-bold text-custom-blue">advantages: </span>
                <span>{transportMean.advantages}</span>
            </div>
            <div>
                <span className="font-bold text-custom-blue">disadvantages: </span>
                <span>{transportMean.disadvantages}</span>
            </div>
            <div>
                <span className="font-bold text-custom-blue">recommendation: </span>
                <span>{transportMean.recommendation}</span>
            </div>
        </div>
    );
};

export default Conveyance;