import React, { useState } from 'react';
import Body from '../layouts/inside/Body'
import Navbar from '../layouts/inside/Navbar'
import TripSelector from '../layouts/inside/TripSelector';
import TripBudgetInformation from '../components/Budget/TripBudgetInformation';
import ManageExpenses from '../components/Budget/ManageExpenses';


const Budget = () => {
    const [trip, setTrip] = useState('');
    const handleTripChange = (e) => setTrip(e.target.value);

    return (
        <div>
            <Navbar></Navbar>
            <Body>
                <TripSelector onTripChange={handleTripChange}></TripSelector>
                {trip && (
                    <TripBudgetInformation></TripBudgetInformation>
                    )}
                {trip && (
                    <ManageExpenses>
                    </ManageExpenses>
                    )}    
            </Body>
        </div>

    )
}

export default Budget;