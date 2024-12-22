import React from 'react';
import CreateTripForm from './CreateTripForm';

const ManageTripSection = () => {
    return (
        <div id="manage-trip-section" className="relative flex flex-col items-center h-screen w-full max-w-7xl ">
            <h2 className="text-3xl text-center text-custom-white mt-4 md:mt-32">Let's plan new trip!</h2>
            <CreateTripForm></CreateTripForm>
        </div>
    );
};

export default ManageTripSection;