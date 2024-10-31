import React, { useState } from 'react';
import Body from '../layouts/inside/Body'
import Navbar from '../layouts/inside/Navbar'
import TripSelector from '../layouts/inside/TripSelector';
import ForecastWrapper from '../components/Forecast/ForecastWrapper';

const Forecast = () => {
    const [trip, setTrip] = useState('');
    const handleTripChange = (e) => setTrip(e.target.value);

    return (
        <div className="h-screen">
        <Navbar></Navbar>
        <Body>
            <TripSelector onTripChange={handleTripChange}></TripSelector>
            {trip && (<ForecastWrapper></ForecastWrapper>)}
        </Body>
    </div>
    )
}

export default Forecast;