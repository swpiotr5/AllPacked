import React, { useState} from 'react';
import { IoMdArrowDropdown } from "react-icons/io";
import Conveyance from './Conveyance';

const TransportationSuggestions = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const transportMeans = [
        {
          name: "Private Car",
          affordability: "Low in cities",
          approximate_cost: "2-3 EUR/hour",
          advantages: "Flexible, private",
          disadvantages: "Traffic, expensive",
          recommendation: "For privacy and comfort"
        },
        {
          name: "Train (RER)",
          affordability: "High",
          approximate_cost: "1.90 EUR",
          advantages: "Fast, frequent",
          disadvantages: "Crowded, rush hours",
          recommendation: "For medium distances"
        },
        {
          name: "City Bus",
          affordability: "High",
          approximate_cost: "1.90 EUR",
          advantages: "Wide coverage",
          disadvantages: "Slow, crowded",
          recommendation: "For short distances"
        },
        {
          name: "Bikes (Vélib')",
          affordability: "Medium",
          approximate_cost: "1.70 EUR/30 min",
          advantages: "Eco-friendly, fast",
          disadvantages: "Weather, theft risk",
          recommendation: "For active users"
        }
      ];
      

    const onExtendElement = (e) => {
        e.preventDefault();
        const detailsSection = document.getElementById('wrapper-trans');
        const arrowDetailsButton = document.getElementById('arrow-trans');
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
        <div id="wrapper-trans" className="flex w-full p-3 items-start flex-col gap-4 bg-custom-medium-blue overflow-hidden h-12 rounded-xl transition-all duration-300">
            <div className='flex'>
                <button id="arrow-trans" onClick={onExtendElement} className="text-3xl transition-all duration-300"><IoMdArrowDropdown /></button>
                <p className="pl-5">Transportation Suggestions</p>
            </div>
            <div className="w-full grid grid-cols-2 gap-5">
                {transportMeans && transportMeans.length > 0 && (
                    transportMeans.map((transportMean) => (
                        <Conveyance transportMean={transportMean}></Conveyance>
                    ))
                )}
            </div>
        </div>
    );
};

export default TransportationSuggestions;