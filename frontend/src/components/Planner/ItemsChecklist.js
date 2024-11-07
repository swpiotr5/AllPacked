import React, { useState } from 'react';
import { IoMdArrowDropdown } from "react-icons/io";
import AddItemForm from './AddItemForm';
import ToPackList from './ToPackList';

const ItemsChecklist = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [itemsStatus, setItemsStatus] = useState([
        { title: "Passport", id: 1, is_packed: false },
        { title: "Towel", id: 2, is_packed: false },
        { title: "Boots", id: 3, is_packed: false },
        { title: "ID", id: 4, is_packed: false },
    ]);

    const onExtendElement = (e) => {
        e.preventDefault();
        const detailsSection = document.getElementById('wrapper-checklist');
        const arrowDetailsButton = document.getElementById('arrow-checklist');
        if (detailsSection) {
            if (isExpanded) {
                detailsSection.classList.remove("h-auto");
                detailsSection.classList.add("h-12");
                arrowDetailsButton.classList.remove("rotate-180");
            } else {
                detailsSection.classList.remove("h-12");
                detailsSection.classList.add("h-auto");
                arrowDetailsButton.classList.add("rotate-180");
            }
            setIsExpanded(!isExpanded);
        }
    };

    const ChangeItemStatus = (id) => {
        const updatedItems = itemsStatus.map(item =>
            item.id === id ? { ...item, is_packed: !item.is_packed } : item
        );
        setItemsStatus(updatedItems);
    };

    const alreadyPacked = itemsStatus.filter(item => item.is_packed);
    const leftToPack = itemsStatus.filter(item => !item.is_packed);

    return (
        <div id="wrapper-checklist" className="flex w-full p-3 items-start flex-col gap-4 bg-custom-medium-blue overflow-hidden h-12 rounded-xl transition-all duration-300">
            <div className='flex'>
                <button id="arrow-checklist" onClick={onExtendElement} className="text-3xl transition-all duration-300"><IoMdArrowDropdown /></button>
                <p className="pl-5">View items checklist</p>
            </div>
            <AddItemForm />
            <ToPackList items={leftToPack} ChangeItemStatus={ChangeItemStatus} />
            <span>Items Packed: {alreadyPacked.length}</span>
            <ToPackList items={alreadyPacked} ChangeItemStatus={ChangeItemStatus} />
        </div>
    );
};

export default ItemsChecklist;
