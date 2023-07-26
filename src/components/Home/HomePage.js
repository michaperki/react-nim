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
  const { activeGames, waitingGames, createGame, joinGame } = useGameManagement(
    user
  );

  const renderGameComponents = () => {
    if (!isLoggedIn) {
      return <LandingPage />;
    }

    return (
      <>
        <div className="flex justify-center">
          <GameButton onClick={createGame} label="Create Game" />
        </div>
        <GameListHeader text="Active Games:" />
        <GameList games={activeGames} />
        <GameListHeader text="Waiting Games:" />
        <GameList games={waitingGames} joinGame={joinGame} />
      </>
    );
  };

  return <div>{renderGameComponents()}</div>;
};

export default Home;
