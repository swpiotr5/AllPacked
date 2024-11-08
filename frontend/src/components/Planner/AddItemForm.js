import React, { useState } from 'react';
import { MdAddCircleOutline } from "react-icons/md";

const AddItemForm = ({ addItem }) => {
    const [newItemTitle, setNewItemTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newItemTitle.trim()) {
            addItem({ title: newItemTitle });
            setNewItemTitle('');
        }
    };

    return (
        <div className="w-full flex justify-center">
            <div className="w-11/12 bg-custom-dark-blue rounded-3xl h-10 flex items-center pl-2">
                <form onSubmit={handleSubmit} className="flex gap-3 w-full items-center">
                    <button type="submit" className="flex items-center justify-center">
                        <MdAddCircleOutline className="text-2xl" />
                    </button>
                    <label className="flex-grow">
                        <input
                            type="text"
                            value={newItemTitle}
                            onChange={(e) => setNewItemTitle(e.target.value)}
                            className="w-11/12 bg-custom-dark-blue h-full"
                            placeholder="Add new item..."
                        />
                    </label>
                </form>
            </div>
        </div>
    );
};

export default AddItemForm;
