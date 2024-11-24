import React, { useState, useEffect } from 'react';
import { IoMdArrowDropdown } from "react-icons/io";
import Places from './Places';
import axios from "../../interceptor/axios";

const PlacesToVisit = ({trip}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const [placesSuggestions, setPlacesSuggestions] = useState();

    useEffect(() => {
        const fetchPlaces = async (tripName) => {
            try {
                const response = await axios.get(`/trip/getplaces`, {
                    params: {
                        tripName: tripName
                    }
                });
                const placesData = response.data;
                setPlacesSuggestions(placesData);
            } catch (error) {
                console.error('Error fetching budget data:', error);
            }
        };

        if (trip.tripName) {
            fetchPlaces(trip.tripName);
        }
    }, [trip.tripName]);

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