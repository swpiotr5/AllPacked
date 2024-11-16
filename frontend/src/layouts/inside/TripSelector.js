import React, { useEffect, useState } from 'react';

const TripSelector = ({ trip, onTripChange }) => {
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        const fetchTrips = async () => {
            const userToken = localStorage.getItem('access_token');
            if (!userToken) {
                console.error("User is not authenticated, no token found.");
                return;
            }
    
            try {
                const response = await fetch('http://localhost:8000/trip/getall', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${userToken}`
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                if (Array.isArray(data)) {
                    setTrips(data);
                } else {
                    console.error('Data is not an array:', data);
                }
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