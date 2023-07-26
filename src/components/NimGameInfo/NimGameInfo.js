// NimGameInfo.js
import React from "react";

const NimGameInfo = ({ currentPlayer }) => {
  return currentPlayer ? (
    <h2 className="text-2xl font-semibold mb-4">
      Current Player: Player {currentPlayer === "player_1" ? 1 : 2}
    </h2>
  ) : null;
};

export default NimGameInfo;
