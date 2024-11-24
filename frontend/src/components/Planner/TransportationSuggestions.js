import React, { useState, useEffect } from 'react';
import { IoMdArrowDropdown } from "react-icons/io";
import Conveyance from './Conveyance';
import axios from "../../interceptor/axios";

const TransportationSuggestions = ({trip}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const [transportMeans, setTransportMeans] = useState();
      
    useEffect(() => {
        const fetchTransportMeans = async (tripName) => {
            try {
                const response = await axios.get(`/trip/gettransportmeans`, {
                    params: {
                        tripName: tripName
                    }
                });
                const transportData = response.data;
                setTransportMeans(transportData);
            } catch (error) {
                console.error('Error fetching budget data:', error);
            }
        };

        if (trip.tripName) {
            fetchTransportMeans(trip.tripName);
        }
    }, [trip.tripName]);

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