import React from "react";

const ActiveGames = ({ activeGames }) => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Active Games</h1>
      <div className="flex justify-center">
        <div className="flex flex-col">
          {activeGames.map((game) => (
            <div key={game.key} className="flex justify-center">
              <div className="bg-white p-6 shadow-md rounded-md">
                <div className="mb-4">
                  <p className="block text-gray-700 font-medium">
                    {game.player_1_email} vs {game.player_2_email}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActiveGames;
