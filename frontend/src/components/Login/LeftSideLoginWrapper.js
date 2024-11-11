import React from 'react';
import LeftSideContainer from './LeftSideContainer';

const LeftSideLoginWrapper = ({loginData, handleChange, handleSubmit}) => {
    return (
        <div className="w-1/2 h-full">
            <LeftSideContainer loginData={loginData} handleChange={handleChange} handleSubmit={handleSubmit}>
            </LeftSideContainer>
        </div>
      );
    }

export default LeftSideLoginWrapper;