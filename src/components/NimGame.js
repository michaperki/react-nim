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

  const isCurrentPlayer = () => {
    if (gameData) {
      if (currentPlayer === 1) {
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
      const gameRef = ref(database, `games/${gameId}`);
      get(gameRef).then((snapshot) => {
        const gameData = snapshot.val();
        const piles = [...gameData.piles];
        piles[selectedPile] -= selectedSticks;
        const currentPlayer =
          gameData.currentPlayer === "player_1" ? "player_2" : "player_1";
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
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-md mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Nim Game</h1>
        {gameData && (
          <div>
            {/* ... (rest of the game information display) */}
            <div className="mt-4">
              <h3 className="font-bold mb-2">Piles:</h3>
              {gameData.piles.map((pile, pileIndex) => (
                <div key={pileIndex} className="mb-4">
                  <div className="flex items-center">
                    {Array(pile)
                      .fill()
                      .map((_, sticksIndex) => (
                        <button
                          key={sticksIndex}
                          onClick={() =>
                            handleSticksClick(pileIndex, sticksIndex + 1)
                          }
                          className={`${
                            selectedPile === pileIndex &&
                            selectedSticks === sticksIndex + 1
                              ? "bg-blue-500 text-white"
                              : "bg-gray-300 text-gray-700"
                          } py-2 px-4 rounded-lg mr-2`}
                        >
                          {sticksIndex + 1}
                        </button>
                      ))}
                  </div>
                </div>
              ))}
            </div>
            {checkGameStatus() && (
              <div className="mt-4">
                <h3 className="font-bold">Game Over!</h3>
                {getWinner() ? (
                  <p className="mt-2">Player {getWinner()} wins!</p>
                ) : (
                  <p className="mt-2">It's a draw!</p>
                )}
              </div>
            )}
            {!checkGameStatus() && (
              <button
                onClick={handlePlay}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-4"
              >
                Play
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NimGame;
