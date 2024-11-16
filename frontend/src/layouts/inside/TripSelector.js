import React, { useEffect, useState } from 'react';
import axios from '../../interceptor/axios';

const TripSelector = ({ trip, onTripChange }) => {
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const response = await axios.get('/trip/getall');
                setTrips(response.data);
            } catch (error) {
                console.error('Error fetching trips:', error);
            }
        };

        fetchTrips();
    }, []);

    return (
        <div className="bg-custom-grey w-60 mt-32 rounded-xl flex justify-center">
            <select
                name="trips"
                id="trip-select"
                value={trip}
                onChange={onTripChange}
                className="uppercase text-center bg-custom-gray tracking-wide text-custom-white font-semibold rounded-xl w-56 h-8"
            >
                <option value="">Select trip</option>
                {trips.map((trip, index) => (
                    <option key={index} value={trip.tripName}>
                        {trip.tripName}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default TripSelector;