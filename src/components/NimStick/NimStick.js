import React from "react";
import "./NimStick.css";

const NimStick = ({ stickIndex, onClick, highlighted, disabled }) => {
    return (
      <button
        onClick={onClick}
        className={`nim-stick ${highlighted ? "highlighted" : ""} ${
          disabled ? "disabled" : ""
        }`}
        disabled={disabled}
      ></button>
    );
  };

export default NimStick;
