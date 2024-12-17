import React from 'react';
import { FaGlobe, FaSuitcase, FaCity } from 'react-icons/fa';

const TripFormFirstStep = ({ tripName, country, city, onChange}) => {
    return (
        <div>
                <div className="w-full flex flex-col gap-10 items-center justify-center">
                    <label className="text-1xl text-custom-white flex items-center flex-col w-2/3 md:w-1/3">
                        Provide trip name
                        <div className="relative w-full mt-5">
                            <input
                                type="text"
                                id="tripName"
                                name="tripName"
                                value={tripName}
                                onChange={onChange}
                                placeholder="trip name here..."
                                className="pl-7 p-2 bg-input-lower-opacity rounded-xl shadow-2xl w-full text-sm input-placeholder text-custom-white"
                            />
                            <FaSuitcase className="absolute right-3 top-1/2 transform -translate-y-1/2 text-custom-white" />
                        </div>
                    </label>
                    <label className="text-1xl text-custom-white flex items-center flex-col w-2/3 md:w-1/3">
                        Provide country
                        <div className="relative w-full mt-5">
                            <input
                                type="text"
                                id="country"
                                name="country"
                                value={country}
                                onChange={onChange}
                                placeholder="Enter country"
                                className="pl-7 p-2 bg-input-lower-opacity rounded-xl shadow-2xl w-full text-sm input-placeholder text-custom-white"
                            />
                            <FaGlobe className="absolute right-3 top-1/2 transform -translate-y-1/2 text-custom-white" />
                        </div>
                    </label>
                    <label className="text-1xl text-custom-white flex items-center flex-col w-2/3 md:w-1/3">
                        Provide city
                        <div className="relative w-full mt-5">
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={city}
                                onChange={onChange}
                                placeholder="trip city here..."
                                className="pl-7 p-2 bg-input-lower-opacity rounded-xl shadow-2xl w-full text-sm input-placeholder text-custom-white"
                            />
                            <FaCity className="absolute right-3 top-1/2 transform -translate-y-1/2 text-custom-white" />
                        </div>
                    </label>
                </div>
        </div>
    );
};

export default TripFormFirstStep;