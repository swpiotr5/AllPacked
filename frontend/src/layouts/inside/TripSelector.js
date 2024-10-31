import React from 'react';

const TripSelector = ({ onTripChange }) => {
    return (
        <div className="bg-custom-grey w-60 mt-32 rounded-xl flex  justify-center">
            <select name="trips" id="trip-select" onChange={onTripChange} className="uppercase text-center bg-custom-gray tracking-wide text-custom-white font-semibold rounded-xl w-56 h-8">
                <option value="">Select trip</option>
                <option value="italy-july">Italy - July</option>
                <option value="france-august">France - August</option>
                <option value="spain-september">Spain - September</option>
            </select>
        </div>
    );
};

export default TripSelector;