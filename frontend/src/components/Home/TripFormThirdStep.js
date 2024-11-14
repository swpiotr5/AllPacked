import React, { useState } from 'react';

const TripFormThirdStep = ({ tripPreferences, accommodation, onChange }) => {
    const [isOther, setIsOther] = useState(false);
    const [customAccommodation, setCustomAccommodation] = useState('');

    const handleAccommodationOtherChange = (e) => {
        const { value } = e.target;
        onChange({ target: { name: 'accommodation', value } }); 

        if (value === "other") {
            setIsOther(true);
        } else {
            setIsOther(false);
            setCustomAccommodation('');
        }
    };

    const handleCustomAccommodationChange = (e) => {
        const { value } = e.target;
        setCustomAccommodation(value);
        onChange({ target: { name: 'accommodation', value } });
    };

    return (
        <div>
            <div className="w-full flex flex-col gap-10 items-center justify-center">
                <label className="text-1xl text-custom-white flex items-center flex-col w-1/3">
                    Select trip preferences
                    <select
                        name="tripPreferences"
                        value={tripPreferences}
                        onChange={onChange}
                        className="pl-7 pr-3 p-2 mt-5 bg-input-lower-opacity rounded-xl shadow-2xl w-full text-sm input-placeholder text-custom-white"
                    >
                        <option value="city">City</option>
                        <option value="nature">Nature</option>
                    </select>
                </label>
                
                <label className="text-1xl text-custom-white flex items-center flex-col w-1/3">
                    What type of accommodation do you plan to choose?
                    <select
                        name="accommodation"
                        value={isOther ? 'other' : accommodation}
                        onChange={handleAccommodationOtherChange} 
                        className="pl-7 pr-3 p-2 mt-5 bg-input-lower-opacity rounded-xl shadow-2xl w-full text-sm input-placeholder text-custom-white"
                    >
                        <option value="tent">Tent</option>
                        <option value="hotel">Hotel</option>
                        <option value="apartment">Apartment</option>
                        <option value="other">Other</option>
                    </select>
                    
                    {isOther && (
                        <input
                            type="text"
                            name="customAccommodation" 
                            value={customAccommodation}
                            onChange={handleCustomAccommodationChange} 
                            placeholder="Specify your accommodation..."
                            className="p-2 pl-7 mt-5 bg-input-lower-opacity rounded-xl shadow-2xl w-full text-sm input-placeholder text-custom-white"
                        />
                    )}
                </label>
            </div>
        </div>
    );
};

export default TripFormThirdStep;
