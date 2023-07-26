import React from "react";
import { useParams } from "react-router-dom";
import { auth } from "../firebase";
import GameStatus from "./GameStatus";
import NewGamePopup from "./NewGamePopup";
import { useGame } from "../hooks/firebase";
import { useNimGameLogic } from "../hooks/useNimGameLogic";
import NimBoard from "./NimBoard";
import NimGameInfo from "./NimGameInfo";

const NimGame = () => {
  const { gameId } = useParams();
  const {
    gameData,
    currentPlayer,
    handlePlay,
    selectedPile,
    selectedSticks,
    handleSticksClick,
    getHighlightedSticks,
    checkGameStatus,
    isCurrentPlayer,
    winner,
    showNewGamePopup,
    handleClosePopup,
  } = useNimGameLogic(gameId);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-md mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Nim Game</h1>
        <NimGameInfo currentPlayer={currentPlayer} />
        {gameData && (
          <NimBoard
            gameData={gameData}
            selectedPile={selectedPile}
            selectedSticks={selectedSticks}
            handleSticksClick={handleSticksClick}
            isCurrentPlayer={isCurrentPlayer}
            getHighlightedSticks={getHighlightedSticks}
          />
        )}
        {checkGameStatus() && <GameStatus winner={winner} />}
        {!checkGameStatus() && (
          <button
            onClick={handlePlay}
            disabled={
              selectedPile === null ||
              selectedSticks.length === 0 ||
              !isCurrentPlayer()
            }
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-4"
          >
            Play
          </button>
        )}
      </div>
      {showNewGamePopup && <NewGamePopup winner={winner} onClose={handleClosePopup} />}
    </div>
  );
};

export default NimGame;
