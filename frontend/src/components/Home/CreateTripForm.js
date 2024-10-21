import React, { useState } from 'react';
import TripFormFirstStep from './TripFormFirstStep';
import TripFormSecondStep from './TripFormSecondStep';
import TripFormThirdStep from './TripFormThirdStep';

const CreateTripForm = () => {
    const [tripName, setTripName] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [date, setDate] = useState('');
    const [tripDuration, setTripDuration] = useState(0);
    const [plannedBudget, setPlannedBudget] = useState(0);
    const [accommodation, setAccommodation] = useState('');
    const [tripPreferences, setTripPreferences] = useState('option1');
    const [currentStep, setCurrentStep] = useState(0);
    const steps = [1, 2, 3]; 

    const nextStep = () => {
        setCurrentStep((prevStep) => Math.min(prevStep + 1, 2));
    };

    const prevStep = () => {
        setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
    };


    const handleTripNameChange = (e) => setTripName(e.target.value);
    const handleCountryChange = (e) => setCountry(e.target.value);
    const handleCityChange = (e) => setCity(e.target.value);
    const handleDateChange = (e) => setDate(e.target.value);
    const handleTripDurationChange = (e) => setTripDuration(e.target.value);
    const handleTripPreferencesChange = (e) => setTripPreferences(e.target.value);
    const handlePlannedBudgetChange = (e) => setPlannedBudget(e.target.value)
    const handleAccommodationChange = (e) => setAccommodation(e.target.value)

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
            <form className="flex flex-col h-3/4 w-full">
            {currentStep === 0 && (
                <TripFormFirstStep
                    tripName={tripName}
                    country={country}
                    city={city}
                    onHandleTripNameChange={handleTripNameChange}
                    onHandleCountryChange={handleCountryChange}
                    onHandleCityChange={handleCityChange}
                />
            )}
            {currentStep === 1 && (
                <TripFormSecondStep
                    date={date}
                    tripDuration={tripDuration}
                    plannedBudget={plannedBudget}
                    onHandlePlannedBudgetChange={handlePlannedBudgetChange}
                    onHandleDateChange={handleDateChange}
                    onHandleTripDurationChange={handleTripDurationChange}
                />
            )}
            {currentStep === 2 && (
                <TripFormThirdStep
                tripPreferences={tripPreferences}
                accommodation={accommodation}
                onHandleAccommodationChange={handleAccommodationChange}
                onHandleTripPreferencesChange={handleTripPreferencesChange}
                />
            )}
            </form>

            <div className="flex justify-center gap-10">
                {currentStep > 0 && (
                    <button onClick={prevStep} className="p-2 w-32 bg-custom-white text-custom-dark-blue rounded">Previous</button>
                )}
                {currentStep < 2 && (
                    <button onClick={nextStep} className="p-2 w-32 bg-custom-white text-custom-dark-blue rounded">Next</button>
                )}
                {currentStep === 2 && (
                    <button className="p-2 w-32 bg-custom-blue text-custom-white rounded">Submit</button>
                )}
            </div>
        </div>
    );
};

export default CreateTripForm;