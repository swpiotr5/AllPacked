import React from 'react';
import { FaSearch } from "react-icons/fa";

const SearchContainer = ({ searchQuery, onSearchChange }) => {

    return (
        <div className="flex justify-end w-full">
            <div className='flex gap-4 w-96 h-10 mr-10 justify-between pl-5 pr-5 items-center bg-custom-blue rounded-3xl'>
                <input
                    type="text"
                    placeholder="Search for your expenses"
                    value={searchQuery}
                    onChange={onSearchChange}
                    className='bg-custom-blue w-full'
                />
                <div>
                    <FaSearch/>
                </div>
            </div>
        </div>
    );
};

export default SearchContainer;