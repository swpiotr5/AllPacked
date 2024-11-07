import React from 'react';
import { MdOutlineRadioButtonUnchecked, MdOutlineRadioButtonChecked } from "react-icons/md";

const ToPackItem = ({ item, ChangeItemStatus }) => {
    const handleToggle = () => {
        ChangeItemStatus(item.id);
    };

    return (
        <li className="topack_item w-full flex justify-center">
            <div className="w-11/12 bg-custom-dark-blue rounded-3xl h-10 flex items-center pl-2">
                {item.is_packed ? (
                    <div>
                        <button id="btn-check" onClick={handleToggle}>
                            <MdOutlineRadioButtonChecked className="text-slate-500"/>
                        </button>
                        <span className="pl-2 text-slate-500 line-through">{item.title}</span>
                    </div>
                ) : (
                    <div>
                        <button id="btn-check" onClick={handleToggle}>
                            <MdOutlineRadioButtonUnchecked />
                        </button>
                        <span className="pl-2">{item.title}</span>
                    </div>
                )}
                
            </div>
        </li>
    );
};

export default ToPackItem;
