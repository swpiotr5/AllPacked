import React, { useState } from 'react';
import { IoMdArrowDropdown } from "react-icons/io";

const AddNewExpense = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const onExtendElement = (e) => {
        e.preventDefault();
        const existingExpenseSection = document.getElementById('wrapper-existing');
        const arrowButton = document.getElementById('arrow-existing');
        if (existingExpenseSection) {
            if (isExpanded) {
                existingExpenseSection.classList.remove("h-64");
                existingExpenseSection.classList.add("h-12");
                arrowButton.classList.remove("rotate-180");
            } else {
                existingExpenseSection.classList.remove("h-12");
                existingExpenseSection.classList.add("h-64");
                arrowButton.classList.add("rotate-180");
            }
            setIsExpanded(!isExpanded);
        }
    };

    return (
        <div id="wrapper-existing" className="flex w-full p-3 items-start gap-4 bg-custom-light-blue overflow-hidden h-12 rounded-xl transition-all duration-300">
            <button id="arrow-existing" onClick={onExtendElement} className="text-3xl transition-all duration-300"><IoMdArrowDropdown /></button>
            <p className="">Modify existing expense</p>
        </div>
    );
};

export default AddNewExpense;