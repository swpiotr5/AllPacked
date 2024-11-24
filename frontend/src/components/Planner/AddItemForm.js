import React, { useState } from 'react';
import { MdAddCircleOutline } from "react-icons/md";

const AddItemForm = ({ addItem, trip }) => {
    const [newItemTitle, setNewItemTitle] = useState('');
    const [isDocument, setIsDocument] = useState(false);
    const [isVaccination, setIsVaccination] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newItemTitle.trim()) {
            addItem({ 
                name: newItemTitle, 
                is_checked: false, 
                is_document: isDocument, 
                is_vaccination: isVaccination,
                tripName: trip.tripName 
            });
            setNewItemTitle('');
            setIsDocument(false);
            setIsVaccination(false);
        }
    };

    return (
        <div className="w-full flex justify-center">
            <div className="w-11/12 bg-custom-dark-blue rounded-3xl h-auto flex flex-col items-center pl-2 py-2">
                <form onSubmit={handleSubmit} className="flex flex-row gap-3 w-full items-center">
                    <div className="flex items-center gap-3 w-full">
                        <button type="submit" className="flex items-center justify-center">
                            <MdAddCircleOutline className="text-2xl" />
                        </button>
                        <label className="flex-grow">
                            <input
                                type="text"
                                value={newItemTitle}
                                onChange={(e) => setNewItemTitle(e.target.value)}
                                className="w-full bg-custom-dark-blue h-full"
                                placeholder="Add new item..."
                            />
                        </label>
                    </div>
                    <div className="flex gap-3 w-full justify-center">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={isDocument}
                                onChange={(e) => setIsDocument(e.target.checked)}
                            />
                            Document
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={isVaccination}
                                onChange={(e) => setIsVaccination(e.target.checked)}
                            />
                            Vaccination
                        </label>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddItemForm;