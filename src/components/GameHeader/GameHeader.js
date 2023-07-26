// GameHeader.js
import React from "react";
import "./GameHeader.css";

const GameHeader = ({ player1, player2 }) => {
  return (
    <div className="game-header">
      <div className="player-info">
        <span className="player-label">Player 1:</span>
        <span className="player-name">{player1}</span>
      </div>
      <div className="player-info">
        <span className="player-label">Player 2:</span>
        <span className="player-name">{player2}</span>
      </div>
    </div>
  );
};

export default GameHeader;
