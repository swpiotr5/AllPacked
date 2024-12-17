import React from 'react';
import logoRowImg from '../../assets/Logo-row.png';
import imgdecor from '../../assets/decor2rotated.png'
import FormContainer from './FormContainer';

const RightSideContainer = ({registerData, handleChange, handleSubmit, error, success}) => {
  return (
    <div className="relative flex gap-2 flex-col h-full justify-center items-center">
        <img src={logoRowImg} alt="Description" className="mt-8 mb-8 w-1/2 md:w-1/4 h-auto object-cover" />
        <span className='text-custom-white text-2xl md:text-xl font-semibold whitespace-pre-line tracking-wide'>Welcome to AllPacked!</span>
        <span className='text-custom-white text-xl md:text-lg font-semibold whitespace-pre-line tracking-wide'>Create an account</span>
        <FormContainer registerData={registerData} handleChange={handleChange} handleSubmit={handleSubmit} error={error} success={success}>
        </FormContainer>
        <img src={imgdecor} alt="Description" className="absolute bottom-0 left-0 w-full opacity-5 object-cover" />
    </div>
  );
};

export default RightSideContainer;