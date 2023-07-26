import React from "react";
import NimStick from "../NimStick";

const NimPile = ({
  pileIndex,
  pileSize,
  selectedPile,
  selectedSticks,
  handleSticksClick,
  isCurrentPlayer,
  getHighlightedSticks,
}) => {
  const isHighlighted = (stickNumber) => {
    if (pileIndex !== selectedPile) {
      return false;
    }
    return getHighlightedSticks().includes(stickNumber);
  };

  return (
    <div className="mb-4 flex items-center justify-center">
      {Array.from(Array(pileSize).keys()).map((stickNumber) => {
        // Increment the stick number by 1 to display sticks starting from 1
        const stickIndex = stickNumber + 1;

        return (
          <NimStick
            key={stickIndex}
            stickIndex={stickIndex}
            onClick={() => handleSticksClick(pileIndex, stickIndex)}
            highlighted={isHighlighted(stickIndex)}
            disabled={!isCurrentPlayer()}
          />
        );
      })}
    </div>
  );
};

export default NimPile;
