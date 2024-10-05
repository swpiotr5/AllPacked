import React from 'react';
import backgroundImg from '../../assets/Logo.png';

const LeftSideContainer = ({ children }) => {
  return (
    <div className="relative flex flex-col justify-center items-center">
        <img src={backgroundImg} alt="Description" className="mt-8 w-1/4 h-auto object-cover" />
        {children}
    </div>
  );
};

export default LeftSideContainer;