// GameList.js
import React from "react";
import useUserProfile from "../../hooks/useUserProfile";

const GameList = ({ games, joinGame }) => {
  return (
    <div>
      {games.map((game) => (
        <div key={game.key} className="mb-4">
          <h3 className="font-bold mb-2">Game ID: {game.key}</h3>
          {/* Fetch user profiles for Player 1 and Player 2 */}
          {game.player_1_ID && (
            <PlayerInfo playerId={game.player_1_ID} email={game.player_1_email} />
          )}
          {game.player_2_ID && (
            <PlayerInfo playerId={game.player_2_ID} email={game.player_2_email} />
          )}
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

const PlayerInfo = ({ playerId, email }) => {
  const userProfile = useUserProfile(playerId);

  if (userProfile) {
    return <p>Player: {userProfile.screenName}</p>;
  }

  // Fallback to displaying the email if the user profile is not yet fetched
  return <p>Email: {email}</p>;
};

export default GameList;
