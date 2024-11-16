import React, { useState } from 'react';
import TripFormFirstStep from './TripFormFirstStep';
import TripFormSecondStep from './TripFormSecondStep';
import TripFormThirdStep from './TripFormThirdStep';

const CreateTripForm = () => {
    const [tripData, setTripData] = useState({
        tripName: '',
        country: '',
        city: '',
        date: '',
        tripDuration: 0,
        accommodation: 'tent',
        tripPreferences: 'city',
    });

    const [budgetData, setBudgetData] = useState({
        plannedBudget: 0,
        spentBudget: 0,
        currency: 'PLN',
    });

    const [currentStep, setCurrentStep] = useState(0);
    const steps = [1, 2, 3]; 

    const nextStep = () => {
        setCurrentStep((prevStep) => Math.min(prevStep + 1, 2));
    };

    const prevStep = () => {
        setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
    };
    const [error, setError] = useState();
    const [success, setSuccess] = useState();
    const handleTripChange = (e) => {
        const { name, value } = e.target;
        setTripData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleBudgetChange = (e) => {
        const { name, value } = e.target;
        setBudgetData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requiredTripFields = ['tripName', 'country', 'city', 'date', 'tripDuration', 'accommodation', 'tripPreferences'];
        const requiredBudgetFields = ['plannedBudget', 'currency'];

        for (let field of requiredTripFields) {
            if (!tripData[field]) {
                setError(`Field ${field} is required.`);
                setSuccess();
                return;
            }
        }

        for (let field of requiredBudgetFields) {
            if (!budgetData[field]) {
                setError(`Field ${field} is required.`);
                setSuccess();
                return;
            }
        }

        const tripDataWithConvertedValues = {
            ...tripData,
            plannedBudget: parseFloat(tripData.plannedBudget), 
            tripDuration: parseInt(tripData.tripDuration),
        };

        const userToken = localStorage.getItem('access_token');

        if (!userToken) {
            console.error("User is not authenticated, no token found.");
            setError("User is not authenticated, no token found.");
            return;
        }

        const dataToSend = {
            trip: {
                accommodation: tripDataWithConvertedValues.accommodation,
                country: tripDataWithConvertedValues.country,
                city: tripDataWithConvertedValues.city,
                date: tripDataWithConvertedValues.date,
                tripName: tripDataWithConvertedValues.tripName,
                tripDuration: tripDataWithConvertedValues.tripDuration,
                tripPreferences: tripDataWithConvertedValues.tripPreferences,
            },
            budget: {
                plannedBudget: parseFloat(budgetData.plannedBudget), 
                spentBudget: budgetData.spentBudget || null,
                currency: budgetData.currency,
            }
        };
        
        try {
            const response = await fetch('http://localhost:8000/trip/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userToken}`
                },
                body: JSON.stringify(dataToSend), 
            });
            
            if (response.ok) {
                setSuccess("Trip data successfully submitted!");
                setError();
            } else {
                setError("Failed to submit trip data");
            }
        } catch (error) {
            setError(error);
        }
    };

    return (
        <div className="mt-10 rounded-xl w-full h-auto flex flex-col gap-10">
            <div className="flex items-center justify-center h-3 gap-3 mb-10">
                    {steps.map((step, i) => (
                        <div
                            key={i}
                            className={`transition-all w-24 h-1 bg-custom-white rounded-xl ${currentStep === i ? "h-2" : "bg-opacity-50"}`}
                        ></div>
                    ))}
                </div>
            <form className="flex flex-col h-3/4 w-full" onSubmit={handleSubmit}>
                {currentStep === 0 && (
                    <TripFormFirstStep
                        tripName={tripData.tripName}
                        country={tripData.country}
                        city={tripData.city}
                        onChange={handleTripChange}
                    />
                )}
                {currentStep === 1 && (
                    <TripFormSecondStep
                        date={tripData.date}
                        tripDuration={tripData.tripDuration}
                        plannedBudget={budgetData.plannedBudget}
                        onTripChange={handleTripChange}
                        onBudgetChange={handleBudgetChange}
                    />
                )}
                {currentStep === 2 && (
                    <TripFormThirdStep
                    tripPreferences={tripData.tripPreferences}
                    accommodation={tripData.accommodation}
                    onChange={handleTripChange}
                />
                )}

                <div className="flex justify-center items-center flex-col gap-5">

                    <div className="flex justify-center gap-5">
                        {error && (
                                <div className="error mt-3 text-red-700 bg-red-100 border-l-4 border-red-500 p-3 rounded-lg shadow-md flex items-center space-x-3">
                                    <i className="fas fa-exclamation-circle text-red-500 text-xl"></i>
                                    <p className="text-sm font-medium">{error}</p>
                                </div>
                            )}
                    </div>
                    {success && (
                        <div className="mt-3 text-green-700 w-1/2 bg-custom-white text-center rounded-xl font-bold p-2 shadow-lg flex items-center justify-center space-x-3 success-message">
                            <i className="fas fa-check-circle text-green-500 text-md"></i>
                            <p className="text-md">{success}</p>
                        </div>
                    )}
                    <div className="flex justify-center gap-10">
                        {currentStep > 0 && (
                            <button type="button" onClick={prevStep} className="p-2 w-32 bg-custom-white text-custom-dark-blue rounded">Previous</button>
                        )}
                        {currentStep < 2 && (
                            <button type="button" onClick={nextStep} className="p-2 w-32 bg-custom-white text-custom-dark-blue rounded">Next</button>
                        )}
                        {currentStep === 2 && (
                            <button type="submit" className="p-2 w-32 bg-custom-blue text-custom-white rounded">Submit</button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateTripForm;