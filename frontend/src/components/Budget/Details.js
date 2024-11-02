import React, { useState, useEffect } from 'react';
import { IoMdArrowDropdown } from "react-icons/io";
import SearchContainer from './SearchContainer';
import ExpensesTable from './ExpensesTable';

const Details = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [expenses, setExpenses] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const mockExpenses = [
            { id: '1', expenseName: 'Local pizza', description: 'Delicious local pizza', cost: '15$', type: 'Food' },
            { id: '2', expenseName: 'Eminem signed poster', description: 'Poster signed by Eminem', cost: '100$', type: 'Souvenir' },
            { id: '3', expenseName: 'Entry museum ticket', description: 'Ticket to the museum', cost: '20$', type: 'Entertainment' },
            { id: '4', expenseName: 'Taxi ride', description: 'Taxi ride to the hotel', cost: '30$', type: 'Transport' },
            { id: '5', expenseName: 'Hotel stay', description: 'One night at the hotel', cost: '150$', type: 'Accommodation' },
            { id: '6', expenseName: 'Coffee', description: 'Morning coffee', cost: '5$', type: 'Food' },
            { id: '7', expenseName: 'Souvenir t-shirt', description: 'T-shirt from the gift shop', cost: '25$', type: 'Souvenir' },
            { id: '8', expenseName: 'Dinner at restaurant', description: 'Dinner at a local restaurant', cost: '50$', type: 'Food' },
        ];
        setExpenses(mockExpenses);
    }, []);

    const onExtendElement = (e) => {
        e.preventDefault();
        const detailsSection = document.getElementById('wrapper-details');
        const arrowDetailsButton = document.getElementById('arrow-details');
        if (detailsSection) {
            if (isExpanded) {
                detailsSection.classList.remove("h-96");
                detailsSection.classList.add("h-12");
                arrowDetailsButton.classList.remove("rotate-180");
            } else {
                detailsSection.classList.remove("h-12");
                detailsSection.classList.add("h-96");
                arrowDetailsButton.classList.add("rotate-180");
            }
            setIsExpanded(!isExpanded);
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    }

    const filteredExpenses = expenses.filter(expense =>
        expense.expenseName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div id="wrapper-details" className="flex w-full p-3 items-start flex-col gap-4 bg-custom-medium-blue overflow-hidden h-12 rounded-xl transition-all duration-300">
            <div className='flex'>
                <button id="arrow-details" onClick={onExtendElement} className="text-3xl transition-all duration-300"><IoMdArrowDropdown /></button>
                <p className="pl-5">Details</p>
            </div>
            <SearchContainer searchQuery={searchQuery} onSearchChange={handleSearchChange}></SearchContainer>
            <div className='w-full flex justify-center'>
                <ExpensesTable expenses={filteredExpenses}></ExpensesTable>
            </div>
        </div>
    );
};

export default Details;