import React from 'react';
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";

const LeftToPackItem = ({ item, handleToggle}) => {
    return (
        <div>
            <button id="btn-check" onClick={handleToggle}>
                <MdOutlineRadioButtonUnchecked />
            </button>
            <span className="pl-2">{item.title}</span>
        </div>
    );
};

export default LeftToPackItem;
