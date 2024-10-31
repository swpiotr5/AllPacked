import React from 'react';
import AddNewExpense from './AddNewExpense';
import ModifyExistingExpense from './ModifyExistingExpense';
import Details from './Details';

const ManageExpenses = () => {
    return (
        <div className="max-w-screen-xl w-full h-full flex justify-center gap-10 items-center mt-12 flex-col text-custom-white uppercase tracking-wide font-semibold">
            <AddNewExpense></AddNewExpense>
            <ModifyExistingExpense></ModifyExistingExpense>
            <Details></Details>
        </div>
    );
};

export default ManageExpenses;