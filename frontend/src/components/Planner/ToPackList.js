import React, { useEffect } from 'react';
import ToPackItem from './ToPackItem';

const ToPackList = ({ items, ChangeItemStatus, removeItem }) => {
    return (
        <ol className="w-full flex flex-col justify-center items-center gap-3">
            {items && items.length > 0 && (
                items.map((item) => (
                    <ToPackItem 
                        key={item.id} 
                        item={item} 
                        ChangeItemStatus={ChangeItemStatus} 
                        removeItem={removeItem} 
                    />
                ))
            )}
        </ol>
    );
};

export default ToPackList;
