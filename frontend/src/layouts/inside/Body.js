import React from 'react';


const Body = ({ children }) => {
    return (
        <div className='relative flex flex-col justify-start items-center min-h-screen h-full bg-cover bg-center bg-no-repeat bg-custom-dark-blue overflow-y-auto'>
            {children}
        </div>
    );
};

export default Body;