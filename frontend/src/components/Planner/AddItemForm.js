import React from 'react';
import { MdAddCircleOutline } from "react-icons/md";

const AddItemForm = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        e.target.reset();
    }

    return (
        <div className="w-full flex justify-center">
            <div className="w-11/12 bg-custom-dark-blue rounded-3xl h-10 flex items-center pl-2">
                <form onSubmit={handleSubmit} className="flex gap-3 w-full items-center">
                    <button className="flex items-center justify-center">
                        <MdAddCircleOutline className="text-2xl" />
                    </button>
                    <label className="flex-grow">
                        <input
                            type="text"
                            name="2pac"
                            id="2pac"
                            className="w-11/12 bg-custom-dark-blue h-full placeholder-white"
                            placeholder="Add new item.."
                        />
                    </label>
                </form>            
            </div>
        </div>

    );
};

export default AddItemForm;