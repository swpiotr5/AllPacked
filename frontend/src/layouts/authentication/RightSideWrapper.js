import React from 'react';

const RightSideWrapper = ({ children }) => {
    return (
        <div className="w-1/2  h-full bg-black">
            {children}
        </div>
      );
    }

    export default RightSideWrapper;