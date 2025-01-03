import React from 'react';
import logoImg from '../../assets/Logo.png';
import imgdecor from '../../assets/decor2.png'
import imgdecorRotated from '../../assets/decor2rotated.png'
import FormContainer from './FormContainer';

const LeftSideContainer = ({loginData, handleChange, handleSubmit, error}) => {

  return (
    <div className="relative flex flex-col h-full justify-center items-center">
        <img src={imgdecor} alt="Description" className="absolute top-0 left-0 w-3/4 opacity-5 object-cover" />
        <img src={logoImg} alt="Description" className="mt-8 w-1/2 md:w-1/4 h-auto object-cover" />
        <img src={imgdecorRotated} alt="Description" className="absolute bottom-0 right-0 w-3/4 opacity-5 object-cover" />
        <FormContainer loginData={loginData} handleChange={handleChange} handleSubmit={handleSubmit} error={error}>
        </FormContainer>
    </div>
  );
};

export default LeftSideContainer;