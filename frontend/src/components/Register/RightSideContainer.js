import React from 'react';
import logoRowImg from '../../assets/Logo-row.png';
import imgdecor from '../../assets/decor2rotated.png'

const RightSideContainer = ({ children }) => {
  return (
    <div className="relative flex gap-5 flex-col h-full justify-center items-center">
        <img src={logoRowImg} alt="Description" className="mt-8 mb-8 w-1/4 h-auto object-cover" />
        <span className='text-custom-white text-2xl font-semibold whitespace-pre-line tracking-wide'>Welcome to AllPacked!</span>
        <span className='text-custom-white text-xl font-semibold whitespace-pre-line tracking-wide'>Create an account</span>
        {children}
        <img src={imgdecor} alt="Description" className="absolute bottom-0 left-0 w-full opacity-5 object-cover" />
    </div>
  );
};

export default RightSideContainer;