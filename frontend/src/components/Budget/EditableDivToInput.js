import React, { useState, useEffect } from 'react';
import { FaEdit } from "react-icons/fa";

const EditableDivToInput = ({ value, onChange }) => {
  const [text, setText] = useState(value);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setText(value);
  }, [value]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
    onChange(text);
  };

  return (
    <div className="flex items-center justify-between w-full overflow-hidden">
      {isEditing ? (
        <input
          type="text"
          value={text}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          autoFocus
          className="rounded w-full bg-custom-light-blue focus:outline-none focus:ring-2 focus:ring-custom-lighter-blue"
        />
      ) : (
        <div className="w-full">{text}</div>
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

export default EditableDivToInput;