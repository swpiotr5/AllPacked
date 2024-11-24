import React, { useState, useEffect } from 'react';
import axios from '../../interceptor/axios';
import { FaCity, FaSuitcase, FaFileAlt, FaSyringe } from 'react-icons/fa';

const Summary = ({ trip, leftToPack, refreshDocs, refreshVacc }) => {
    const [items, setItems] = useState([]);
    const city = trip.city;

    useEffect(() => {
        const fetchItems = async (tripName) => {
            try {
                const response = await axios.get(`/trip/getitems`, {
                    params: {
                        tripName: tripName
                    }
                });
                const itemsData = response.data;
                setItems(itemsData);
            } catch (error) {
                console.error('Error fetching items data:', error);
            }
        };

        if (trip.tripName) {
            fetchItems(trip.tripName);
        }
    }, [trip.tripName, refreshDocs, refreshVacc]);

    const documentsNeeded = items.filter(item => item.is_document).map(item => item.name).join(', ') || "None";
    const vaccinationsRequired = items.filter(item => item.is_vaccination).map(item => item.name).join(', ') || "None";

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 w-full max-w-screen-xl rounded-xl text-md uppercase tracking-wide font-bold text-custom-white">
            <div className="bg-custom-medium-blue rounded-xl p-5 flex flex-col justify-evenly items-center shadow-lg">
                <FaCity className="text-4xl text-custom-blue mb-2" />
                <p className="text-lg">City to visit</p>
                <p className="text-2xl text-custom-blue">{city}</p>
            </div>
            <div className="bg-custom-medium-blue rounded-xl p-5 flex flex-col justify-evenly items-center shadow-lg">
                <FaSuitcase className="text-4xl text-custom-blue mb-2" />
                <p className="text-lg">Items left to pack</p>
                <p className="text-2xl text-custom-blue">{leftToPack}</p>
            </div>
            <div className="bg-custom-medium-blue rounded-xl p-5 flex flex-col justify-evenly items-center shadow-lg">
                <FaFileAlt className="text-4xl text-custom-blue mb-2" />
                <p className="text-lg">Documents needed</p>
                <p className="text-center text-lg text-custom-blue">{documentsNeeded}</p>
            </div>
            <div className="bg-custom-medium-blue rounded-xl p-5 flex flex-col justify-evenly items-center shadow-lg">
                <FaSyringe className="text-4xl text-custom-blue mb-2" />
                <p className="text-lg">Vaccination required</p>
                <p className="text-center text-lg text-custom-blue">{vaccinationsRequired}</p>
            </div>
        </div>
    );
}

export default Summary;