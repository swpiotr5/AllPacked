import React, { useState } from 'react';
import { IoMdArrowDropdown } from "react-icons/io";
import axios from "../../interceptor/axios";
import { Snackbar, Alert, Portal } from '@mui/material';

const AddNewExpense = ({trip, setRefreshData}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const [expenseData, setExpenseData] = useState({
        description: '',
        name: '',
        exp_type: 'food',
        amount: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExpenseData({
            ...expenseData,
            [name]: value
        });
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowSuccess(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];

        const expenseWithDate = {
            ...expenseData,
            date: formattedDate
        };
        try {
            const response = await axios.post('/trip/addexpense', {
                tripName: trip.tripName,
                expense: expenseWithDate
            });
            console.log('Expense added successfully:', response.data);
            setShowSuccess(true);
            setRefreshData(prev => !prev);
        } catch (error) {
            console.error('Error adding expense:', error);
        }
    };

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
            <form className="w-full flex flex-col gap-7" onSubmit={handleSubmit}>
                <div className="grid grid-cols-4 gap-10 pl-5 pr-5">
                    <label className="text-sm text-custom-white flex flex-col w-full">
                            Expense name
                            <div className="relative w-full mt-2">
                                <input
                                    type="text"
                                    name="name"
                                    value={expenseData.name}
                                    onChange={handleChange}
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
                                    name="description"
                                    value={expenseData.description}
                                    onChange={handleChange}
                                    placeholder=""
                                    className="pl-7 p-2 h-10 bg-custom-light-blue rounded-xl shadow-2xl w-full text-sm input-placeholder text-custom-white"
                                />
                            </div>
                        </label>
                        <label className="text-sm text-custom-white flex flex-col w-full">
                            Amount
                            <div className="relative w-full mt-2">
                                <input
                                    type="number"
                                    name="amount"
                                    value={expenseData.amount}
                                    onChange={handleChange}
                                    placeholder=""
                                    className="pl-7 p-2 h-10 bg-custom-light-blue rounded-xl shadow-2xl w-full text-sm input-placeholder text-custom-white"
                                />
                            </div>
                        </label>
                        <label className="text-sm text-custom-white flex flex-col w-full">
                            Type
                            <div className="relative w-full align-center mt-2">
                                <select
                                    name="exp_type"
                                    value={expenseData.exp_type}
                                    onChange={handleChange}
                                    className="pl-7 p-2 h-10 bg-custom-light-blue rounded-xl shadow-2xl w-full text-sm input-placeholder  uppercase text-custom-white"
                                >
                                    <option value="food">Food</option>
                                    <option value="souvenir">Souvenir</option>
                                    <option value="transport">Transport</option>
                                    <option value="grocery">Grocery</option>
                                    <option value="accomodation">Accomodation</option>
                                    <option value="shopping">Shopping</option>
                                </select>
                                
                            </div>
                        </label>
                    </div>
                    <div className="w-full flex justify-center">
                        <button type="submit" className="p-2 w-32 bg-custom-blue text-custom-white rounded-2xl">Submit</button>
                    </div>
            </form>
            <Snackbar open={showSuccess} autoHideDuration={3000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" style={{ backgroundColor: '#4caf50', color: '#fff' }}>
                    Expense added successfully!
                </Alert>
            </Snackbar>
        </div>
    );
};

export default AddNewExpense;