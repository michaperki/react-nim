import React from "react";

const GameList = ({ games, joinGame }) => {
  return (
    <div>
      {games.map((game) => (
        <div key={game.key} className="mb-4">
          <h3 className="font-bold mb-2">Game ID: {game.key}</h3>
          <p>Player 1: {game.player_1_email}</p>
          {game.player_2_ID && <p>Player 2: {game.player_2_email}</p>}
          {game.status === "waiting" && (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => joinGame(game.key)}
            >
              Join Game
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default GameList;
