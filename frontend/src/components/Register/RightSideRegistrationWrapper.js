import React from 'react';
import RightSideContainer from '../../components/Register/RightSideContainer';

const RightSideRegistrationWrapper = ({registerData, handleChange, handleSubmit, error, success}) => {
    return (
        <div className="w-full md:w-1/2 h-full">
            <RightSideContainer registerData={registerData} handleChange={handleChange} handleSubmit={handleSubmit} error={error} success={success}></RightSideContainer>
        </div>
      );
    }

export default RightSideRegistrationWrapper;
