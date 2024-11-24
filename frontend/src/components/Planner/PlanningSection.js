import React from 'react';
import ItemsChecklist from './ItemsChecklist';
import TransportationSuggestions from './TransportationSuggestions';
import PlacesToVisit from './PlacesToVisit';

const PlanningSection = ({trip, setLeftToPack}) => {
    return (
        <div className="max-w-screen-xl w-full h-full flex justify-center gap-10 items-center mt-12 mb-12 flex-col text-custom-white uppercase tracking-wide font-semibold">
            <ItemsChecklist setLeftToPack={setLeftToPack}></ItemsChecklist>
            <PlacesToVisit trip={trip}></PlacesToVisit>
            <TransportationSuggestions></TransportationSuggestions>
        </div>
    );
};

export default PlanningSection;