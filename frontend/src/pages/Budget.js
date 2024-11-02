import React, { useState, useEffect } from 'react';
import Body from '../layouts/inside/Body';
import Navbar from '../layouts/inside/Navbar';
import TripSelector from '../layouts/inside/TripSelector';
import TripBudgetInformation from '../components/Budget/TripBudgetInformation';
import ManageExpenses from '../components/Budget/ManageExpenses';

const Budget = () => {
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
            <Navbar />
            <Body>
                <TripSelector trip={trip} onTripChange={handleTripChange} />
                {trip && (
                    <TripBudgetInformation />
                )}
                {trip && (
                    <ManageExpenses />
                )}
            </Body>
        </div>
    );
};

export default Budget;