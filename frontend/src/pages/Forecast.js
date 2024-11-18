import React, { useState, useEffect } from 'react';
import Body from '../layouts/inside/Body'
import Navbar from '../layouts/inside/Navbar'
import TripSelector from '../layouts/inside/TripSelector';
import ForecastWrapper from '../components/Forecast/ForecastWrapper';

const Forecast = ({setIsAuth}) => {
    const [trip, setTrip] = useState({
        tripName: '',
        country: '',
        city: '',
        date: '',
        tripDuration: 0,
        accommodation: 'tent',
        tripPreferences: 'city',
    });

    useEffect(() => {
        const savedTrip = localStorage.getItem('selectedTrip');
        if (savedTrip) {
            setTrip(JSON.parse(savedTrip));
        }
    }, []);

    const handleTripChange = (selectedTrip) => {
        setTrip(selectedTrip);
        localStorage.setItem('selectedTrip', JSON.stringify(selectedTrip));
        console.log(selectedTrip);
    };

    return (
        <div className="h-screen">
        <Navbar setIsAuth={setIsAuth}></Navbar>
        <Body>
            <TripSelector trip={trip} onTripChange={handleTripChange}></TripSelector>
            {trip.tripName && (<ForecastWrapper trip={trip}></ForecastWrapper>)}
        </Body>
    </div>
    )
}

export default Forecast;