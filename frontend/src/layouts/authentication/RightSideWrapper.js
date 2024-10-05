import React from 'react';

const RightSideWrapper = ({ children }) => {
    return (
        <div className="w-1/2 h-100 bg-black">
            {children}
        </div>
      );
    }

    export default RightSideWrapper;