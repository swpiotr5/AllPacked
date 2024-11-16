import React, { useState, useEffect } from 'react';
import Body from '../layouts/inside/Body'
import Navbar from '../layouts/inside/Navbar'
import TripSelector from '../layouts/inside/TripSelector';
import ForecastWrapper from '../components/Forecast/ForecastWrapper';

const Forecast = ({setIsAuth}) => {
    const [trip, setTrip] = useState('');

    const handleTripChange = (e) => {
        const selectedTrip = e.target.value;
        setTrip(selectedTrip);
    };

    return (
        <div className="h-screen">
        <Navbar setIsAuth={setIsAuth}></Navbar>
        <Body>
            <TripSelector trip={trip} onTripChange={handleTripChange}></TripSelector>
            {trip && (<ForecastWrapper></ForecastWrapper>)}
        </Body>
    </div>
    )
}

export default Forecast;