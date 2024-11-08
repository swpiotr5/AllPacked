import React, { useState, useEffect } from 'react';
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

    const messages = [
        "Looks like you’re traveling *very* light... ready to start packing?",
        "An empty list? Bold strategy. Shall we add a toothbrush at least?",
        "So… planning on winging it? Might want to add a few essentials!",
        "Minimalism at its finest! Or maybe it’s time to start packing?",
        "Nothing packed yet? Ah, a master of last-minute packing, I see.",
        "Traveling with nothing? Revolutionary. But just in case… want to start packing?",
        "Starting with a blank slate, huh? Bold. Now, add something before you regret it.",
        "Empty list, empty suitcase, empty… plan? Maybe add a thing or two before it’s too late.",
        "No items? All set to live on vibes alone? Good luck with that.",
        "This is your ‘no-plan’ plan? Let’s avoid a disaster and pack *something*.",
        "Wow, this packing list screams ‘unprepared.’ Time to change that?",
        "Taking ‘winging it’ to a whole new level, are we? Start packing, maybe?",
        "Going all in on chaos, I see. Throw a few essentials in there, just in case.",
        "Traveling dangerously close to unprepared? Might want to add a few things.",
        "Trying to make packing a thrill-seeker’s sport? Go on, add some basics.",
        "Confident you don’t need anything? Let’s at least get the essentials covered."
    ];
    
    const [randomMessage, setRandomMessage] = useState("");

    useEffect(() => {
        setRandomMessage(messages[Math.floor(Math.random() * messages.length)]);
    }, []);

    const onExtendElement = (e) => {
        e.preventDefault();
        setIsExpanded(prevState => !prevState);
    };

    const ChangeItemStatus = (id) => {
        const updatedItems = itemsStatus.map(item =>
            item.id === id ? { ...item, is_packed: !item.is_packed } : item
        );
        setItemsStatus(updatedItems);
    };

    const removeItem = (id) => {
        const updatedItems = itemsStatus.filter(item => item.id !== id);
        setItemsStatus(updatedItems);
    };
    

    const addItem = (newItem) => {
        setItemsStatus(prevItems => [
            ...prevItems,
            { ...newItem, id: prevItems.length + 1, is_packed: false }
        ]);
    };

    const alreadyPacked = itemsStatus.filter(item => item.is_packed);
    const leftToPack = itemsStatus.filter(item => !item.is_packed);

    return (
        <div id="wrapper-checklist" className={`flex w-full p-3 pb-5 items-start flex-col gap-4 bg-custom-medium-blue overflow-hidden ${isExpanded ? 'h-auto' : 'h-12'} rounded-xl transition-all duration-300`}>
            <div className='flex'>
                <button id="arrow-checklist" onClick={onExtendElement} className={`text-3xl transition-all duration-300 ${isExpanded ? 'rotate-180' : ''}`}><IoMdArrowDropdown /></button>
                <p className="pl-5">View items checklist</p>
            </div>
            <AddItemForm addItem={addItem}/>
            <ToPackList items={leftToPack} ChangeItemStatus={ChangeItemStatus} removeItem={removeItem}/>
            <span className="text-xs ml-14">Items Packed: {alreadyPacked.length}</span>
            {alreadyPacked.length > 0 ? (
                <ToPackList items={alreadyPacked} ChangeItemStatus={ChangeItemStatus} removeItem={removeItem}/>
            ) : (
                <span id="random-message" className="text-xs ml-14">{randomMessage}</span>
            )}
        </div>
    );
};

export default ItemsChecklist;
