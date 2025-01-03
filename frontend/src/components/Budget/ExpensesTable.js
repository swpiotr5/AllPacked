import React from 'react';

const ExpensesTable = ({ expenses, budget }) => {
    return (
        <div className="flex flex-col mt-5 w-full md:w-11/12 h-56">
            <div className='grid grid-cols-2 md:grid-cols-4 w-full h-10 items-center bg-custom-blue rounded-3xl pr-2'>
                <div className="text-center"><p>Expense name</p></div>
                <div className="hidden md:block text-center"><p>Description</p></div>
                <div className="text-center"><p>Cost ({budget.currency})</p></div>
                <div className="hidden md:block text-center"><p>Type</p></div>
            </div>
            <div className="overflow-y-auto h-full custom-scrollbar pr-1">
                {expenses.map((expense, index) => (
                    <div key={expense.id} className={`grid grid-cols-2 md:grid-cols-4 w-full h-10 items-center bg-custom-light-blue rounded-3xl mt-2`}>
                        <div className="text-center">{expense.name}</div>
                        <div className="hidden md:block text-center">{expense.description}</div>
                        <div className="text-center">{expense.amount}</div>
                        <div className="hidden md:block text-center">{expense.exp_type}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExpensesTable;