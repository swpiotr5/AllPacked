import React, { useState, useEffect } from 'react';
import { IoMdArrowDropdown } from "react-icons/io";
import AddItemForm from './AddItemForm';
import ToPackList from './ToPackList';
import axios from "../../interceptor/axios";

const ItemsChecklist = ({ trip, setLeftToPack, setRefreshVacc, setRefreshDocs }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async (tripName) => {
            try {
                const response = await axios.get(`/trip/getitems`, {
                    params: {
                        tripName: tripName
                    }
                });
                const itemsData = response.data;
                setItems(itemsData);
            } catch (error) {
                console.error('Error fetching budget data:', error);
            }
        };

        if (trip.tripName) {
            fetchItems(trip.tripName);
        }
    }, [trip.tripName]);

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

    const ChangeItemStatus = async (id) => {
        const updatedItems = items.map(item =>
            item.item_id === id ? { ...item, is_checked: !item.is_checked } : item
        );
        setItems(updatedItems);
    
        const updatedItem = updatedItems.find(item => item.item_id === id);
        try {
            const response = await axios.put('/trip/putitem', updatedItem);
            console.log('Item updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    const removeItem = (id) => {
        const updatedItems = items.filter(item => item.item_id !== id);
        setItems(updatedItems);
    };

    const addItem = async (newItem) => {
        try {
            const response = await axios.post('/trip/additem', newItem);
            const addedItem = response.data;
            setItems(prevItems => [
                ...prevItems,
                { ...addedItem, item_id: prevItems.length + 1, is_checked: false }
            ]);
            console.log('Item added successfully:', addedItem);
            setRefreshDocs(prev => !prev);
            setRefreshVacc(prev => !prev);
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    const alreadyPacked = items.filter(item => item.is_checked);

    useEffect(() => {
        const leftToPackItems = items.filter(item => !item.is_checked);
        setLeftToPack(leftToPackItems.length);
    }, [items, setLeftToPack]);

    return (
        <div id="wrapper-checklist" className={`flex w-full p-3 pb-5 items-start flex-col gap-4 bg-custom-medium-blue overflow-hidden ${isExpanded ? 'h-auto' : 'h-12'} rounded-xl transition-all duration-300`}>
            <div className='flex w-full'>
                <button id="arrow-checklist" onClick={onExtendElement} className={`text-3xl transition-all duration-300 ${isExpanded ? 'rotate-180' : ''}`}><IoMdArrowDropdown /></button>
                <p className="pl-5">View items checklist</p>
            </div>
            <AddItemForm setRefreshVacc={setRefreshVacc} setRefreshDocs={setRefreshDocs} trip={trip} addItem={addItem} />
            <ToPackList items={items.filter(item => !item.is_checked)} ChangeItemStatus={ChangeItemStatus} removeItem={removeItem} />
            <span className="text-xs ml-14">Items Packed: {alreadyPacked.length}</span>
            {alreadyPacked.length > 0 ? (
                <ToPackList items={alreadyPacked} ChangeItemStatus={ChangeItemStatus} removeItem={removeItem} />
            ) : (
                <span id="random-message" className="text-xs ml-14">{randomMessage}</span>
            )}
        </div>
    );
};

export default ItemsChecklist;