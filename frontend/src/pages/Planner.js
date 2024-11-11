import React, { useState, useEffect } from 'react';
import Body from '../layouts/inside/Body'
import Navbar from '../layouts/inside/Navbar'
import TripSelector from '../layouts/inside/TripSelector';
import Summary from '../components/Planner/Summary';
import PlanningSection from '../components/Planner/PlanningSection';

const Planner = ({setIsAuth}) => {
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
            <Navbar setIsAuth={setIsAuth}></Navbar>
            <Body>
                <TripSelector trip={trip} onTripChange={handleTripChange}></TripSelector>
                {trip && (
                    <Summary></Summary>
                )}
                {trip && (
                    <PlanningSection></PlanningSection>
                )}
            </Body>
        </div>

    )
}

export default Planner;