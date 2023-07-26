import React from "react";

const NimStick = ({ stickIndex, onClick, highlighted, disabled }) => {
  return (
    <button
      onClick={onClick}
      className={`${
        highlighted ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"
      } py-2 px-4 rounded-lg mr-2`}
      disabled={disabled}
    >
      {stickIndex}
    </button>
  );
};

export default NimStick;
