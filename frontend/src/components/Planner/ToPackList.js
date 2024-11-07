import React from 'react';
import ToPackItem from './ToPackItem';

const ToPackList = ({ items, ChangeItemStatus }) => {
    return (
        <ol className="w-full flex flex-col justify-center items-center gap-3">
            {items && items.length > 0 && (
                items.map((item, index) => (
                    <ToPackItem key={item.id} item={item} ChangeItemStatus={ChangeItemStatus} />
                ))
            )}
        </ol>
    );
};

export default ToPackList;
