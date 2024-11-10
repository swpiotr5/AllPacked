import React from 'react';
import '../../App.css'; 

const Input= ({type, name, value, onChange, icon}) => {
    return (
        <div className="flex items-center pl-2 w-full bg-input-lower-opacity rounded-xl">
            {icon}
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="p-2 pl-3 bg-input-lower-opacity rounded-xl shadow-2xl w-full text-sm input-placeholder text-custom-white"
                style={{ fontFamily: 'Arial, FontAwesome' }}
            />
        </div>
    );
};

export default Input;