import React from "react";

const GameStatus = ({ gameData }) => {
  const checkGameStatus = () => {
    // game is over when there is exactly one stick left
    if (gameData) {
      const totalSticks = gameData.piles.reduce((a, b) => a + b, 0);
      return totalSticks === 1;
    }
  };

  const getWinner = () => {
    if (gameData && checkGameStatus()) {
      return gameData.currentPlayer === "player_1" ? "Player 2" : "Player 1";
    }
    return null;
  };

  return (
    <div>
      {checkGameStatus() && (
        <div className="mt-4">
          <h3 className="font-bold">Game Over!</h3>
          <p className="mt-2">{getWinner()} wins!</p>
        </div>
      )}
    </div>
  );
};

export default GameStatus;
