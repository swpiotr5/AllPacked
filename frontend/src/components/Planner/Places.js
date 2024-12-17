import React from 'react';

const Places = ({placeSuggestions}) => {

    return (
        <div className="flex flex-col p-5 w-full bg-custom-dark-blue gap-2 rounded-xl">
            <div>
                <span className="font-bold text-custom-blue">name: </span>
                <span>{placeSuggestions.name}</span>
            </div>
            <div>
                <span className="font-bold text-custom-blue">location: </span>
                <span>{placeSuggestions.location}</span>
            </div>
            <div>
                <span className="font-bold text-custom-blue">type: </span>
                <span>{placeSuggestions.type}</span> 
            </div>
            <div>
                <span className="font-bold text-custom-blue">cost: </span>
                <span>{placeSuggestions.cost}</span> 
            </div>
            <div>
                <span className="font-bold text-custom-blue">duration: </span>
                <span>{placeSuggestions.duration}</span>
            </div>
            <div>
                <span className="font-bold text-custom-blue">priority: </span>
                <span>{placeSuggestions.priority}</span>
            </div>
            <div>
                <span className="font-bold text-custom-blue">description: </span>
                <span>{placeSuggestions.description}</span>
            </div>
            <div>
                <span className="font-bold text-custom-blue">tips: </span>
                {placeSuggestions.tips.map((tip, index) => (
                    <span key={index}>
                        {tip}
                        {index < placeSuggestions.tips.length - 1 && ', '}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Places;