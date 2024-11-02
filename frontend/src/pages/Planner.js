import React, { useState, useEffect } from 'react';
import Body from '../layouts/inside/Body'
import Navbar from '../layouts/inside/Navbar'
import TripSelector from '../layouts/inside/TripSelector';

const Planner = () => {
    const [trip, setTrip] = useState('');

    useEffect(() => {
        const savedTrip = localStorage.getItem('trip');
        if (savedTrip) {
            setTrip(savedTrip);
        }
    }, []);

    const handleTripChange = (e) => {
        const selectedTrip = e.target.value;
        setTrip(selectedTrip);
        localStorage.setItem('trip', selectedTrip);
    };

    return (
        <div>
            <Navbar></Navbar>
            <Body>
                <TripSelector trip={trip} onTripChange={handleTripChange}></TripSelector>
            </Body>
        </div>

    )
}

export default Planner;