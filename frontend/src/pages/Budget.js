import React, { useState, useEffect } from 'react';
import Body from '../layouts/inside/Body';
import Navbar from '../layouts/inside/Navbar';
import TripSelector from '../layouts/inside/TripSelector';
import TripBudgetInformation from '../components/Budget/TripBudgetInformation';
import ManageExpenses from '../components/Budget/ManageExpenses';
import axios from "../interceptor/axios";

const Budget = ({setIsAuth}) => {
    const [trip, setTrip] = useState({
        tripName: '',
        country: '',
        city: '',
        date: '',
        tripDuration: 0,
        accommodation: 'tent',
        tripPreferences: 'city',
    });

    const [budget, setBudget] = useState({
        plannedBudget: 0,
        spentBudget: 0,
        currency: 'EUR',
    });

    const [refreshData, setRefreshData] = useState(false);

    useEffect(() => {
        const savedTrip = localStorage.getItem('selectedTrip');
        if (savedTrip) {
            setTrip(JSON.parse(savedTrip));
        }
    }, []);
    
    useEffect(() => {
        const fetchBudget = async (tripName) => {
            try {
                const response = await axios.get(`/trip/getbudget`, {
                    params: {
                        tripName: tripName
                    }
                });
                const budgetData = response.data;
                if (budgetData.spentBudget === null) {
                    budgetData.spentBudget = 0;
                }
                setBudget(budgetData);
            } catch (error) {
                console.error('Error fetching budget data:', error);
            }
        };

        if (trip.tripName) {
            fetchBudget(trip.tripName);
        }
    }, [trip.tripName, refreshData]);

    const handleTripChange = (selectedTrip) => {
        setTrip(selectedTrip);
        localStorage.setItem('selectedTrip', JSON.stringify(selectedTrip));
        console.log(selectedTrip);
    };

    return (
        <div>
            <Navbar setIsAuth={setIsAuth}/>
            <Body>
                <TripSelector trip={trip} onTripChange={handleTripChange} />
                {trip.tripName && (
                    <TripBudgetInformation  trip={trip} budget={budget}/>
                )}
                {trip.tripName && (
                    <ManageExpenses trip={trip} setRefreshData={setRefreshData}/>
                )}
            </Body>
        </div>
    );
};

export default Budget;