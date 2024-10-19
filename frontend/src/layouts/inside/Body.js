import React from 'react';

const Body = ({children}) => {

    return (
        <div className='relative flex justify-center items-center h-screen bg-cover bg-center bg-no-repeat bg-custom-dark-blue'>
            {children}
        </div>
    )
}

export default Body;