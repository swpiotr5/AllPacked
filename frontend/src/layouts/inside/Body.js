import React from 'react';


const Body = ({ children }) => {
    return (
        <div className='relative flex flex-col justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat bg-custom-dark-blue overflow-y-auto'>
            {children}
        </div>
    );
};

export default Body;