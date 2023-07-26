import { useState, useEffect } from "react";
import { ref, get, set, onValue } from "firebase/database";
import { auth, database } from "../firebase";
import { useGame } from "./firebase";

export function useNimGameLogic(gameId) {
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

  return {
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
    updateGameData
  };
}