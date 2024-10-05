import React from 'react';
import backgroundImg from '../../assets/background-auth.jpg';

const AuthLayout = ({ children }) => {
  return (
    <div className="relative flex justify-center items-center h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${backgroundImg})` }}>
      <div className="absolute inset-0 bg-black opacity-85"></div>
      <div className="absolute inset-0 bg-blue-500 opacity-5"></div>
      <div className="relative flex bg-custom-blue rounded-l shadow-2xl w-2/3 h-3/4 bg-opacity-90 max-w-6xl">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;