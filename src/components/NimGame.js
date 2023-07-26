import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ref, get, set, onValue } from "firebase/database";
import { auth, database } from "../firebase";
import NimPile from "./NimPile";
import GameStatus from "./GameStatus";
import GameHeader from "./GameHeader";
import NewGamePopup from "./NewGamePopup";
import { useGame } from "../hooks/firebase";

const NimGame = () => {
  const { gameId } = useParams();
  const [selectedPile, setSelectedPile] = useState(null);
  const [selectedSticks, setSelectedSticks] = useState([]);
  const [showNewGamePopup, setShowNewGamePopup] = useState(false);
  const [winner, setWinner] = useState(null);
  const { gameData, currentPlayer, updateGameData } = useGame(gameId);

  useEffect(() => {
    if (checkGameStatus()) {
      setShowNewGamePopup(true);
      const winner = gameData.currentPlayer === "player_1" ? 2 : 1;
      setWinner(winner);
    }
  }, [gameData, currentPlayer]);

  const handleSticksClick = (pileIndex, sticksCount) => {
    setSelectedPile(pileIndex);
    setSelectedSticks(sticksCount);
  };

  const isCurrentPlayer = () => {
    if (gameData) {
      if (currentPlayer === "player_1") {
        return gameData.player_1_ID === auth.currentUser.uid;
      }
      return gameData.player_2_ID === auth.currentUser.uid;
    }
    console.log("Game has not started yet!");
    return false;
  };

  const handlePlay = () => {
    if (!isCurrentPlayer()) {
      console.log("Not your turn!");
      return;
    }
    if (selectedPile !== null && selectedSticks !== null) {
      const newPileSize = gameData.piles[selectedPile] - selectedSticks;
      const newPiles = [...gameData.piles];
      newPiles[selectedPile] = newPileSize;
      const updatedData = {
        ...gameData,
        piles: newPiles,
        currentPlayer: currentPlayer === "player_1" ? "player_2" : "player_1",
      };
      updateGameData(updatedData);
      setSelectedPile(null);
      setSelectedSticks([]);
    }
  };

  const checkGameStatus = () => {
    // game is over when there is exactly one stick left
    if (gameData) {
      const totalSticks = gameData.piles.reduce((a, b) => a + b, 0);
      return totalSticks === 1;
    }
  };

  const getWinner = () => {
    if (gameData && checkGameStatus()) {
      return gameData.currentPlayer === "player_1" ? 2 : 1;
    }
    return null;
  };

  const getHighlightedSticks = () => {
    if (selectedPile === null || selectedSticks.length === 0) {
      return [];
    }

    const highlightedSticks = [];
    for (let i = 0; i < selectedSticks; i++) {
      highlightedSticks.push(i + 1);
    }

    return highlightedSticks;
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-md mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Nim Game</h1>
        {currentPlayer && (
          <h2 className="text-2xl font-semibold mb-4">
            Current Player: Player {currentPlayer === "player_1" ? 1 : 2}
          </h2>
        )}
        {gameData && (
          <div>
            <GameHeader
              player1={gameData.player_1_email}
              player2={gameData.player_2_email}
            />
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
            {checkGameStatus() && <GameStatus winner={getWinner()} />}
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
        )}
        {showNewGamePopup && <NewGamePopup winner={winner} />}
      </div>
    </div>
  );
};

export default NimGame;
