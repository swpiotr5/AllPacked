import React from 'react';
import backgroundImg from '../../assets/background-auth.jpg';

const AuthLayout = ({ children }) => {
  return (
    <div className="relative flex justify-center items-center h-screen bg-cover bg-center bg-no-repeat bg-custom-dark-blue"  style={{ backgroundImage: `url(${backgroundImg})` }}>
      <div className="absolute inset-0 bg-black opacity-90"></div>
      <div className="absolute inset-0 bg-blue-500 opacity-5"></div>
      <div className="relative flex bg-custom-blue rounded-m shadow-white-glow shadow-2xl w-2/3 h-3/4 bg-opacity-90 max-w-6xl">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;