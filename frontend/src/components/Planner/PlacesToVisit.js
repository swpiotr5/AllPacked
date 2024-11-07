import React, { useState} from 'react';
import { IoMdArrowDropdown } from "react-icons/io";

const PlacesToVisit = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const onExtendElement = (e) => {
        e.preventDefault();
        const detailsSection = document.getElementById('wrapper-places');
        const arrowDetailsButton = document.getElementById('arrow-places');
        if (detailsSection) {
            if (isExpanded) {
                detailsSection.classList.remove("h-96");
                detailsSection.classList.add("h-12");
                arrowDetailsButton.classList.remove("rotate-180");
            } else {
                detailsSection.classList.remove("h-12");
                detailsSection.classList.add("h-96");
                arrowDetailsButton.classList.add("rotate-180");
            }
            setIsExpanded(!isExpanded);
        }
    };

    return (
        <div id="wrapper-places" className="flex w-full p-3 items-start flex-col gap-4 bg-custom-medium-blue overflow-hidden h-12 rounded-xl transition-all duration-300">
            <div className='flex'>
                <button id="arrow-places" onClick={onExtendElement} className="text-3xl transition-all duration-300"><IoMdArrowDropdown /></button>
                <p className="pl-5">Places to visit suggestions</p>
            </div>
        </div>
    );
};

export default PlacesToVisit;