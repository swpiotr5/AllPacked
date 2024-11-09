import React, { useState} from 'react';
import { IoMdArrowDropdown } from "react-icons/io";
import Places from './Places';

const PlacesToVisit = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const placesSuggestions = [
        {
            name: "Colosseum",
            type: "Landmark",
            cost: "16 EUR",
            duration: "1-2 hrs",
            priority: "must-see",
            description: "Ancient arena, iconic site.",
            tips: ["Book tickets online", "Best in early morning"]
        },
        {
            name: "Vatican Museums",
            type: "Museum",
            cost: "17 EUR",
            duration: "2-3 hrs",
            priority: "must-see",
            description: "Art, history, Sistine Chapel.",
            tips: ["Go early", "Expect crowds"]
        },
        {
            name: "Trevi Fountain",
            type: "Fountain",
            cost: "Free",
            duration: "30 mins",
            priority: "recommended",
            description: "Baroque fountain, coin tossing.",
            tips: ["Visit at night", "Keep small coins"]
        },
        {
            name: "Pantheon",
            type: "Historical Building",
            cost: "Free",
            duration: "30 mins - 1 hr",
            priority: "must-see",
            description: "Ancient temple, great dome.",
            tips: ["Quietest early morning", "Check opening hours"]
        }
    ];
    

    const onExtendElement = (e) => {
        e.preventDefault();
        const detailsSection = document.getElementById('wrapper-places');
        const arrowDetailsButton = document.getElementById('arrow-places');
        if (detailsSection) {
            if (isExpanded) {
                detailsSection.classList.remove("h-auto");
                detailsSection.classList.add("h-12");
                arrowDetailsButton.classList.remove("rotate-180");
            } else {
                detailsSection.classList.remove("h-12");
                detailsSection.classList.add("h-auto");
                arrowDetailsButton.classList.add("rotate-180");
            }
            setIsExpanded(!isExpanded);
        }
    };

    return (
        <div id="wrapper-places" className="flex w-full p-3 items-start flex-col gap-4 bg-custom-medium-blue overflow-hidden h-12 rounded-xl transition-all duration-300">
            <div className='flex'>
                <button id="arrow-places" onClick={onExtendElement} className="text-3xl "><IoMdArrowDropdown /></button>
                <p className="pl-5">Places to visit suggestions</p>
            </div>
            <div className="w-full grid grid-cols-2 gap-5">
                {placesSuggestions && placesSuggestions.length > 0 && (
                    placesSuggestions.map((placeSuggestions) => (
                        <Places placeSuggestions={placeSuggestions}></Places>
                    ))
                )}
            </div>
        </div>
    );
};

export default PlacesToVisit;