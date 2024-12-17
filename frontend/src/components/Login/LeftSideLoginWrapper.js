import React from 'react';
import LeftSideContainer from './LeftSideContainer';

const LeftSideLoginWrapper = ({ loginData, handleChange, handleSubmit, error }) => {
    return (
        <div className="w-full md:w-1/2 h-full">
            <LeftSideContainer loginData={loginData} handleChange={handleChange} handleSubmit={handleSubmit} error={error}>
            </LeftSideContainer>
        </div>
    );
}

export default LeftSideLoginWrapper;