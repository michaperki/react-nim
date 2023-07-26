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
      setCurrentPlayer(currentPlayer === "player_1" ? "player_2" : "player_1");
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
      return gameData.currentPlayer === 1 ? 2 : 1;
    }
    return null;
  };

  const getHighlightedSticks = () => {
    if (selectedPile === null || selectedSticks === null) {
      return [];
    }
  
    const highlightedSticks = [];
    for (let i = 0; i < selectedSticks; i++) {
      const stickNumber = selectedPile * 5 + i;
      highlightedSticks.push(stickNumber);
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
            {/* ... (rest of the game information display) */}
            <div className="mt-4">
              <h3 className="font-bold mb-2">Piles:</h3>
              {gameData.piles.map((pile, pileIndex) => (
                <div
                  key={pileIndex}
                  className="mb-4 flex items-center justify-center"
                >
                  {Array(pile)
                    .fill()
                    .map((_, sticksIndex) => {
                      const stickNumber = pileIndex * 5 + sticksIndex;
                      const isHighlighted =
                        getHighlightedSticks().includes(stickNumber);
                      return (
                        <button
                          key={stickNumber}
                          onClick={() =>
                            handleSticksClick(pileIndex, sticksIndex + 1)
                          }
                          className={`${
                            isHighlighted
                              ? "bg-blue-500 text-white"
                              : "bg-gray-300 text-gray-700"
                          } py-2 px-4 rounded-lg mr-2`}
                        >
                          {sticksIndex + 1}
                        </button>
                      );
                    })}
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
