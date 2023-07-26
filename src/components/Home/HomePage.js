// Home.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { useGameManagement } from "../../hooks/useGameManagement";
import LandingPage from "../LandingPage";
import GameButton from "./GameButton";
import GameList from "./GameList";

const GameListHeader = ({ text }) => {
  return <h2 className="text-xl font-semibold mb-4">{text}</h2>;
};

const Home = ({ isLoggedIn, user }) => {
  const navigate = useNavigate();
  const { activeGames, waitingGames, createGame, joinGame } =
    useGameManagement(user);

  const renderGameComponents = () => {
    if (!isLoggedIn) {
      return <LandingPage />;
    }

    return (
      <div className="max-w-md mx-auto">
        <div className="my-8">
          <GameButton onClick={createGame} label="Create Game" />
        </div>
        <div className="mt-8">
          <GameListHeader text="Waiting Games:" />
          <GameList games={waitingGames} joinGame={joinGame} />
        </div>
        <div>
          <GameListHeader text="Active Games:" />
          <GameList games={activeGames} />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">{renderGameComponents()}</div>
    </div>
  );
};

export default Home;
