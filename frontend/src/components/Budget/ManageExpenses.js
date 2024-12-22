import React, { useState } from 'react';
import AddNewExpense from './AddNewExpense';
import ModifyExistingExpense from './ModifyExistingExpense';
import Details from './Details';

const ManageExpenses = ({trip, budget, setRefreshData}) => {
    const [refreshModify, setRefreshModify] = useState(false);
    const [refreshDetails, setRefreshDetails] = useState(false);

    return (
        <div className="max-w-screen-xl w-full h-full flex justify-center gap-10 items-center mt-12 mb-32 md:mb-12 flex-col text-custom-white uppercase tracking-wide font-semibold">
            <AddNewExpense trip={trip} budget={budget} setRefreshData={setRefreshData} setRefreshModify={setRefreshModify} setRefreshDetails={setRefreshDetails}></AddNewExpense>
            <ModifyExistingExpense trip={trip} budget={budget} setRefreshData={setRefreshData} refreshModify={refreshModify} setRefreshDetails={setRefreshDetails}></ModifyExistingExpense>
            <Details trip={trip} budget={budget} refreshDetails={refreshDetails}></Details>
        </div>
    );
};

export default ManageExpenses;