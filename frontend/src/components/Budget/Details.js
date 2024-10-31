import React, { useState } from 'react';
import { IoMdArrowDropdown } from "react-icons/io";

const Details = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const onExtendElement = (e) => {
        e.preventDefault();
        const detailsSection = document.getElementById('wrapper-details');
        const arrowDetailsButton = document.getElementById('arrow-details');
        if (detailsSection) {
            if (isExpanded) {
                detailsSection.classList.remove("h-64");
                detailsSection.classList.add("h-12");
                arrowDetailsButton.classList.remove("rotate-180");
            } else {
                detailsSection.classList.remove("h-12");
                detailsSection.classList.add("h-64");
                arrowDetailsButton.classList.add("rotate-180");
            }
            setIsExpanded(!isExpanded);
        }
    };

    return (
        <div id="wrapper-details" className="flex w-full p-3 items-start gap-4 bg-custom-light-blue overflow-hidden h-12 rounded-xl transition-all duration-300">
            <button id="arrow-details" onClick={onExtendElement} className="text-3xl transition-all duration-300"><IoMdArrowDropdown /></button>
            <p className="">Details</p>
        </div>
    );
};

export default Details;