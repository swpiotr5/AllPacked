import React, { useState } from 'react';
import { IoMdArrowDropdown } from "react-icons/io";

const AddNewExpense = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const onExtendElement = (e) => {
        e.preventDefault();
        const newExpenseSection = document.getElementById('wrapper');
        const arrowButton = document.getElementById('arrow');
        if (newExpenseSection) {
            if (isExpanded) {
                newExpenseSection.classList.remove("h-64");
                newExpenseSection.classList.add("h-12");
                arrowButton.classList.remove("rotate-180");
            } else {
                newExpenseSection.classList.remove("h-12");
                newExpenseSection.classList.add("h-64");
                arrowButton.classList.add("rotate-180");
            }
            setIsExpanded(!isExpanded);
        }
    };

    return (
        <div id="wrapper" className="flex w-full p-3 items-start gap-4 bg-custom-light-blue overflow-hidden h-12 rounded-xl transition-all duration-300">
            <button id="arrow" onClick={onExtendElement} className="text-3xl transition-all duration-300"><IoMdArrowDropdown /></button>
            <p className="">Add new expense</p>
        </div>
    );
};

export default AddNewExpense;