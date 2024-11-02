import React, { useState } from 'react';
import { IoMdArrowDropdown } from "react-icons/io";

const AddNewExpense = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [expenseName, setExpenseName] = useState();
    const [description, setDescription] = useState();
    const [cost, setCost] = useState();
    const [type, setType] = useState();


    const handleExpenseNameChange = (e) => setExpenseName(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);
    const handleCostChange = (e) => setCost(e.target.value);
    const handleTypeChange = (e) => setType(e.target.value);

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
        <div id="wrapper" className="flex w-full flex-col p-3 items-start gap-8 bg-custom-medium-blue overflow-hidden h-12 rounded-xl transition-all duration-300">
            <div className="flex w-full">
                <button id="arrow" onClick={onExtendElement} className="text-3xl transition-all duration-300"><IoMdArrowDropdown /></button>
                <p className="pl-4">Add new expense</p>
            </div>
            <form className="w-full flex flex-col gap-7">
                <div className="grid grid-cols-4 gap-10 pl-5 pr-5">
                    <label className="text-sm text-custom-white flex flex-col w-full">
                            Expense name
                            <div className="relative w-full mt-2">
                                <input
                                    type="text"
                                    id="expenseName"
                                    value={expenseName}
                                    onChange={handleExpenseNameChange}
                                    placeholder=""
                                    className="pl-7 p-2 h-10 bg-custom-light-blue rounded-xl shadow-2xl w-full text-sm input-placeholder text-custom-white"
                                />
                            </div>
                        </label>
                        <label className="text-sm text-custom-white flex flex-col w-full">
                            Description
                            <div className="relative w-full mt-2">
                                <input
                                    type="text"
                                    id="description"
                                    value={description}
                                    onChange={handleDescriptionChange}
                                    placeholder=""
                                    className="pl-7 p-2 h-10 bg-custom-light-blue rounded-xl shadow-2xl w-full text-sm input-placeholder text-custom-white"
                                />
                            </div>
                        </label>
                        <label className="text-sm text-custom-white flex flex-col w-full">
                            Cost
                            <div className="relative w-full mt-2">
                                <input
                                    type="text"
                                    id="cost"
                                    value={cost}
                                    onChange={handleCostChange}
                                    placeholder=""
                                    className="pl-7 p-2 h-10 bg-custom-light-blue rounded-xl shadow-2xl w-full text-sm input-placeholder text-custom-white"
                                />
                            </div>
                        </label>
                        <label className="text-sm text-custom-white flex flex-col w-full">
                            Type
                            <div className="relative w-full align-center mt-2">
                                <select
                                    value={type}
                                    onChange={handleTypeChange}
                                    className="pl-7 p-2 h-10 bg-custom-light-blue rounded-xl shadow-2xl w-full text-sm input-placeholder  uppercase text-custom-white"
                                >
                                    <option value="food">Food</option>
                                    <option value="souvenir">Souvenir</option>
                                    <option value="transport">Transport</option>
                                    <option value="grocery">Grocery</option>
                                </select>
                                
                            </div>
                        </label>
                    </div>
                    <div className="w-full flex justify-center">
                        <button type="submit" className="p-2 w-32 bg-custom-blue text-custom-white rounded-2xl">Submit</button>
                    </div>
            </form>
        </div>
    );
};

export default AddNewExpense;