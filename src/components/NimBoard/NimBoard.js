// NimGameBoard.js
import React from "react";
import NimPile from "../NimPile";
import GameHeader from "../GameHeader";

const NimBoard = ({
  gameData,
  selectedPile,
  selectedSticks,
  handleSticksClick,
  isCurrentPlayer,
  getHighlightedSticks,
}) => {
  return (
    <div>
      <GameHeader player1={gameData.player_1_ID} player2={gameData.player_2_ID} />
      <div className="mt-4">
        <h3 className="font-bold mb-2">Piles:</h3>
        {gameData.piles.map((pile, pileIndex) => (
          <NimPile
            key={pileIndex}
            pileIndex={pileIndex}
            pileSize={pile}
            selectedPile={selectedPile}
            selectedSticks={selectedSticks}
            handleSticksClick={handleSticksClick}
            isCurrentPlayer={isCurrentPlayer}
            getHighlightedSticks={getHighlightedSticks}
          />
        ))}
      </div>
    </div>
  );
};

export default NimBoard;