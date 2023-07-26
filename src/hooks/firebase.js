import { useEffect, useState } from "react";
import { ref, onValue, set } from "firebase/database";
import { database } from "../firebase";

export function useGame(gameId) {
  const [gameData, setGameData] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(null);

  useEffect(() => {
    const gameRef = ref(database, `games/${gameId}`);
    const unsubscribe = onValue(gameRef, (snapshot) => {
      const gameData = snapshot.val();
      setGameData(gameData);
      setCurrentPlayer(gameData.currentPlayer);
    });

    return () => unsubscribe();
  }, [gameId]);

  const updateGameData = (updatedData) => {
    const gameRef = ref(database, `games/${gameId}`);
    set(gameRef, updatedData);
  };

  return { gameData, currentPlayer, updateGameData };
}
