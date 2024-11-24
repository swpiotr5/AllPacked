import React, { useState, useEffect } from 'react';
import Body from '../layouts/inside/Body'
import Navbar from '../layouts/inside/Navbar'
import TripSelector from '../layouts/inside/TripSelector';
import Summary from '../components/Planner/Summary';
import PlanningSection from '../components/Planner/PlanningSection';

const Planner = ({setIsAuth}) => {
    const [trip, setTrip] = useState('');
    const [leftToPack, setLeftToPack] = useState(0);

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

    const [refreshDocs, setRefreshDocs] = useState(false);
    const [refreshVacc, setRefreshVacc] = useState(false);

    return (
        <div>
            <Navbar setIsAuth={setIsAuth}></Navbar>
            <Body>
                <TripSelector trip={trip} onTripChange={handleTripChange}></TripSelector>
                {trip && (
                    <Summary trip={trip} leftToPack={leftToPack} refreshVacc={refreshVacc} refreshDocs={refreshDocs}></Summary>
                )}
                {trip && (
                    <PlanningSection trip={trip} setLeftToPack={setLeftToPack} setRefreshDocs={setRefreshDocs} setRefreshVacc={setRefreshVacc}></PlanningSection>
                )}
            </Body>
        </div>

    )
}

export default Planner;