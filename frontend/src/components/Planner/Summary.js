import React, { useState, useEffect } from 'react';

const Summary = () => {
    const cities = "Roma";
    const leftToPack = 5;
    const docuNeeded = "ID";
    const vaccinationRequired = "No";

    return (
        <div className="grid grid-cols-5 p-8 gap-8 mt-12 w-full h-64 bg-custom-blue max-w-screen-xl rounded-xl text-md uppercase tracking-wide font-bold text-custom-white">
            <div className="w-full bg-custom-dark-blue rounded-xl p-2 flex flex-col justify-evenly gap-2 items-center">
                <p>Cities to visit</p>
                <p className='text-2xl text-custom-blue'>{cities}</p>
            </div>
            <div className="w-full bg-custom-dark-blue rounded-xl p-2 flex flex-col justify-evenly gap-2 items-center">
                <p>Items left to pack</p>
                <p className='text-2xl text-custom-blue'>{leftToPack}</p>
            </div>
            <div className="w-full flex justify-center items-center">
                <p className="text-2xl">Summary</p>
            </div>
            <div className="w-full bg-custom-dark-blue rounded-xl p-2 flex flex-col justify-evenly gap-2 items-center">
                <p>Documents needed</p>
                <p className='text-2xl text-custom-blue'>{docuNeeded}</p>
            </div>
            <div className="w-full bg-custom-dark-blue rounded-xl p-2 flex flex-col justify-evenly gap-2 items-center">
                <p>Vaccination required</p>
                <p className='text-2xl text-custom-blue'>{vaccinationRequired}</p>
            </div>
        </div>
    );
}

export default Summary;