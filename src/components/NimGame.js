import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ref, get, set, onValue } from "firebase/database";
import { auth, database } from "../firebase";

const NimGame = () => {
  const { gameId } = useParams();
  const [gameData, setGameData] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [selectedPile, setSelectedPile] = useState(null);
  const [selectedSticks, setSelectedSticks] = useState([]);

  useEffect(() => {
    const gameRef = ref(database, `games/${gameId}`);
    const unsubscribe = onValue(gameRef, (snapshot) => {
      const gameData = snapshot.val();
      setGameData(gameData);
      setCurrentPlayer(gameData.currentPlayer);
    });

    return () => unsubscribe();
  }, [gameId]);

  const handleSticksClick = (pileIndex, sticksCount) => {
    setSelectedPile(pileIndex);
    setSelectedSticks(sticksCount);
  };

  const handlePlay = () => {
    if (selectedPile !== null && selectedSticks !== null) {
      const gameRef = ref(database, `games/${gameId}`);
      get(gameRef).then((snapshot) => {
        const gameData = snapshot.val();
        const piles = [...gameData.piles];
        piles[selectedPile] -= selectedSticks;
        const currentPlayer = gameData.currentPlayer === 1 ? 2 : 1;
        set(gameRef, { ...gameData, piles, currentPlayer });
      });

      setSelectedPile(null);
      setSelectedSticks(null);
    }
  };

  const checkGameStatus = () => {
    if (gameData) {
      const isGameOver = gameData.piles.every((pile) => pile === 0);
      return isGameOver;
    }
    return false;
  };

  const getWinner = () => {
    if (gameData && checkGameStatus()) {
      return gameData.currentPlayer === 1 ? 2 : 1;
    }
    return null;
  };

  return (
    <div>
      <h1>Nim Game</h1>
      <div>
        {gameData && (
          <div>
            <h2>Game ID: {gameId}</h2>
            <h3>Current Player: {currentPlayer}</h3>
            {selectedPile !== null && (
              <div>
                <h3>Selected Pile: {selectedPile + 1}</h3>
                {selectedSticks !== null && (
                  <h3>Selected Sticks: {selectedSticks}</h3>
                )}
              </div>
            )}
            <h3>Piles:</h3>
            {gameData.piles.map((pile, pileIndex) => (
              <div key={pileIndex}>
                <div>
                  {Array(pile)
                    .fill()
                    .map((_, sticksIndex) => (
                      <button
                        key={sticksIndex}
                        onClick={() => handleSticksClick(pileIndex, sticksIndex + 1)}
                        className={
                          selectedPile === pileIndex &&
                          selectedSticks === sticksIndex + 1
                            ? "selected"
                            : ""
                        }
                      >
                        {sticksIndex + 1}
                      </button>
                    ))}
                </div>
              </div>
            ))}
            {checkGameStatus() && (
              <div>
                <h3>Game Over!</h3>
                {getWinner() ? (
                  <p>Player {getWinner()} wins!</p>
                ) : (
                  <p>It's a draw!</p>
                )}
              </div>
            )}
            {!checkGameStatus() && (
              <button onClick={handlePlay}>Play</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NimGame;
