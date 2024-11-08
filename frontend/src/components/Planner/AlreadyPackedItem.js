import React from 'react';
import { MdOutlineRadioButtonChecked } from "react-icons/md";

const AlreadyPackedItem = ({ item, handleToggle}) => {
    return (
        <div>
            <button id="btn-check" onClick={handleToggle}>
                <MdOutlineRadioButtonChecked className="text-slate-500"/>
            </button>
            <span className="pl-2 text-slate-500 line-through">{item.title}</span>
        </div>
    );
};

export default AlreadyPackedItem;
