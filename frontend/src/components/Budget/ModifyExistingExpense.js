import React, { useState, useEffect } from 'react';
import { IoMdArrowDropdown } from "react-icons/io";
import EditableDivToInput from './EditableDivToInput';
import EditableDivToSelect from './EditableDivToSelect';

const ModifyExistingExpense = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [expenses, setExpenses] = useState([]);
    const [selectedExpense, setSelectedExpense] = useState(null);

    useEffect(() => {
        const mockExpenses = [
            { id: '1', expenseName: 'Local pizza', description: 'Delicious local pizza', cost: '15$', type: 'Food' },
            { id: '2', expenseName: 'Eminem signed poster', description: 'Poster signed by Eminem', cost: '100$', type: 'Souvenir' },
            { id: '3', expenseName: 'Entry museum ticket', description: 'Ticket to the museum', cost: '20$', type: 'Entertainment' },
        ];
        setExpenses(mockExpenses);
    }, []);

    const handleExpenseChange = (e) => {
        if (e && e.target) {
            const selectedExpenseId = e.target.value;
            const expense = expenses.find(exp => exp.id === selectedExpenseId);
            setSelectedExpense(expense);
        }
    };

    const handleFieldChange = (field, value) => {
        setSelectedExpense(prevExpense => ({
            ...prevExpense,
            [field]: value
        }));
        setExpenses(prevExpenses => prevExpenses.map(exp => exp.id === selectedExpense.id ? { ...exp, [field]: value } : exp));
    };

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
        <div id="wrapper-existing" className="flex w-full flex-col p-3 items-start gap-2 bg-custom-medium-blue overflow-hidden h-12 rounded-xl transition-all duration-300">
            <div className="flex w-full">
                <button id="arrow-existing" onClick={onExtendElement} className="text-3xl transition-all duration-300"><IoMdArrowDropdown /></button>
                <p className="pl-4">Modify existing expense</p>
            </div>
            <div className="w-full flex justify-center">
                <select
                    name="expenses"
                    id="expense-select"
                    onChange={handleExpenseChange}
                    className="uppercase text-center bg-custom-gray tracking-wide text-custom-white font-semibold rounded-xl w-56 h-8"
                >
                    <option value="">Select expense</option>
                    {expenses.map(expense => (
                        <option key={expense.id} value={expense.id}>{expense.expenseName}</option>
                    ))}
                </select>
            </div>
            {selectedExpense && (
                <div className='flex flex-col justify-center items-center w-full gap-6'>
                    <div className="grid grid-cols-4 gap-10 w-full pl-5 pr-5 mt-5">
                        <div>
                            <p>Expense name</p>
                            <div className="pl-7 p-2 h-10 bg-custom-light-blue rounded-xl shadow-2xl w-full text-sm input-placeholder text-custom-white">
                                <EditableDivToInput value={selectedExpense.expenseName} onChange={(value) => handleFieldChange('expenseName', value)} />
                            </div>
                        </div>
                        <div>
                            <p>Description</p>
                            <div className="pl-7 p-2 h-10 bg-custom-light-blue rounded-xl shadow-2xl w-full text-sm input-placeholder text-custom-white">
                                <EditableDivToInput value={selectedExpense.description} onChange={(value) => handleFieldChange('description', value)} />
                            </div>
                        </div>
                        <div>
                            <p>Cost</p>
                            <div className="pl-7 p-2 h-10 bg-custom-light-blue rounded-xl shadow-2xl w-full text-sm input-placeholder text-custom-white">
                                <EditableDivToInput value={selectedExpense.cost} onChange={(value) => handleFieldChange('cost', value)} />
                            </div>
                        </div>
                        <div>
                            <p>Type</p>
                            <div className="pl-7 p-2 h-10 bg-custom-light-blue rounded-xl shadow-2xl w-full text-sm input-placeholder text-custom-white">
                                <EditableDivToSelect value={selectedExpense.type} onChange={(value) => handleFieldChange('type', value)} />
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex justify-center">
                        <button type="submit" className="p-2 w-32 bg-custom-blue text-custom-white rounded-2xl">Submit</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ModifyExistingExpense;