import React from 'react';
import AlreadyPackedItem from './AlreadyPackedItem';
import LeftToPackItem from './LeftToPackItem';
import { MdDelete } from "react-icons/md";

const ToPackItem = ({ item, ChangeItemStatus, removeItem }) => {
    const handleToggle = () => {
        ChangeItemStatus(item.item_id);
    };

    const handleRemove = () => {
        removeItem(item.id);  
    };

    return (
        <li className="topack_item w-full flex justify-center">
            <div className="w-11/12 bg-custom-dark-blue rounded-3xl h-10 flex items-center justify-between pl-2">
                {item.is_packed ? (
                    <AlreadyPackedItem item={item} handleToggle={handleToggle} />
                ) : (
                    <LeftToPackItem item={item} handleToggle={handleToggle} />
                )}
                <div className="w-8">
                    <button onClick={handleRemove}><MdDelete /></button>
                </div>
            </div>
        </li>
    );
};


export default ToPackItem;
