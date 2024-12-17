import React, { useState, useEffect } from 'react';
import { IoMdArrowDropdown } from "react-icons/io";
import SearchContainer from './SearchContainer';
import ExpensesTable from './ExpensesTable';
import axios from "../../interceptor/axios";

const Details = ({trip, budget, refreshDetails}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [expenses, setExpenses] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await axios.get('/trip/getallexpenses', {
                    params: {
                        tripName: trip.tripName
                    }
                });
                setExpenses(response.data);
            } catch (error) {
                console.error('Error fetching expenses:', error);
            }
        };

        if (trip.tripName) {
            fetchExpenses();
        }
    }, [trip.tripName, refreshDetails]);

    const onExtendElement = (e) => {
        e.preventDefault();
        const detailsSection = document.getElementById('wrapper-details');
        const arrowDetailsButton = document.getElementById('arrow-details');
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

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    }

    const filteredExpenses = expenses.filter(expense =>
        expense.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div id="wrapper-details" className="flex w-full p-3 items-start flex-col gap-4 bg-custom-medium-blue overflow-hidden h-12 rounded-xl transition-all duration-300">
            <div className='flex w-full'>
                <button id="arrow-details" onClick={onExtendElement} className="text-3xl transition-all duration-300"><IoMdArrowDropdown /></button>
                <p className="pl-5">Details</p>
            </div>
            <SearchContainer searchQuery={searchQuery} onSearchChange={handleSearchChange}></SearchContainer>
            <div className='w-full flex justify-center'>
                <ExpensesTable budget={budget} expenses={filteredExpenses}></ExpensesTable>
            </div>
        </div>
    );
};

export default Details;