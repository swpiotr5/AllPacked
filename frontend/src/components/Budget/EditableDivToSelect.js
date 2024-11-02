import React, { useState, useEffect } from 'react';
import { FaEdit } from "react-icons/fa";

const EditableDivToSelect = ({ value, onChange }) => {
  const [type, setType] = useState(value);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setType(value);
  }, [value]);

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
    onChange(type);
  };

  return (
    <div className="flex items-center justify-between w-full">
      {isEditing ? (
        <select
          value={type}
          onChange={handleTypeChange}
          onBlur={handleInputBlur}
          className="bg-custom-light-blue rounded-xl w-full text-sm input-placeholder uppercase text-custom-white"
        >
          <option value="food">Food</option>
          <option value="souvenir">Souvenir</option>
          <option value="transport">Transport</option>
          <option value="grocery">Grocery</option>
        </select>
      ) : (
        <div className="">{type}</div>
      )}
      <button
        onClick={handleEditClick}
        disabled={isEditing}
        className="text-white px-3 py-1 rounded hover:bg-custom-medium-blue disabled:opacity-50"
      >
       <FaEdit />
      </button>
    </div>
  );
};

export default EditableDivToSelect;