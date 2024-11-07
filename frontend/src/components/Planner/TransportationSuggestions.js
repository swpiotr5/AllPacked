import React, { useState} from 'react';
import { IoMdArrowDropdown } from "react-icons/io";

const TransportationSuggestions = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const onExtendElement = (e) => {
        e.preventDefault();
        const detailsSection = document.getElementById('wrapper-trans');
        const arrowDetailsButton = document.getElementById('arrow-trans');
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
        <div id="wrapper-trans" className="flex w-full p-3 items-start flex-col gap-4 bg-custom-medium-blue overflow-hidden h-12 rounded-xl transition-all duration-300">
            <div className='flex'>
                <button id="arrow-trans" onClick={onExtendElement} className="text-3xl transition-all duration-300"><IoMdArrowDropdown /></button>
                <p className="pl-5">Transportation Suggestions</p>
            </div>
        </div>
    );
};

export default TransportationSuggestions;