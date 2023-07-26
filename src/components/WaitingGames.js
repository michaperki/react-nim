import React from "react";

const WaitingGames = ({ waitingGames, joinGame }) => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Waiting Games</h1>
      <div className="flex justify-center">
        <div className="flex flex-col">
          {waitingGames.map((game) => (
            <div key={game.key} className="flex justify-center">
              <div className="bg-white p-6 shadow-md rounded-md">
                <div className="mb-4">
                  <p className="block text-gray-700 font-medium">
                    {game.player_1_email}
                  </p>
                </div>
                <div className="mb-4">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => joinGame(game.key)}
                  >
                    Join Game
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WaitingGames;
