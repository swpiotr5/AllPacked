import React from 'react';
import ItemsChecklist from './ItemsChecklist';
import TransportationSuggestions from './TransportationSuggestions';
import PlacesToVisit from './PlacesToVisit';

const PlanningSection = ({trip, setLeftToPack, setRefreshVacc, setRefreshDocs}) => {
    return (
        <div className="max-w-screen-xl w-full h-full flex justify-center gap-10 items-center mt-12 mb-24 md:mb-12 flex-col text-custom-white uppercase tracking-wide font-semibold">
            <ItemsChecklist trip={trip} setLeftToPack={setLeftToPack} setRefreshVacc={setRefreshVacc} setRefreshDocs={setRefreshDocs}></ItemsChecklist>
            <PlacesToVisit trip={trip}></PlacesToVisit>
            <TransportationSuggestions trip={trip}></TransportationSuggestions>
        </div>
    );
};

export default PlanningSection;