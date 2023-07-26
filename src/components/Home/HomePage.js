import React, { useState, useEffect } from "react";
import { auth, database, set } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { get, ref, onValue, push } from "firebase/database";
import LandingPage from "../LandingPage";
import GameButton from "./GameButton";
import GameList from "./GameList";

const Home = ({ isLoggedIn, user }) => {
  const navigate = useNavigate();
  const [activeGames, setActiveGames] = useState([]);
  const [waitingGames, setWaitingGames] = useState([]);

  // Function to create a new game
  const createGame = () => {
    if (!user) {
      // Ensure user exists before proceeding
      return;
    }

    const newGameRef = ref(database, "games");
    const newGameData = {
      player_1_ID: user.uid,
      player_1_email: user.email,
      player_2_ID: null,
      player_2_email: null,
      status: "waiting",
      deleted: false,
      piles: [1, 3, 5, 7],
    };

    const newGameRefWithKey = push(newGameRef);
    const newGameKey = newGameRefWithKey.key;
    const newGameWithKey = { ...newGameData, key: newGameKey };

    return set(newGameRefWithKey, newGameWithKey).then(() => {
      navigate(`/game/${newGameKey}`);
    });
  };

  // Function to join an existing game
  const joinGame = (gameId) => {
    if (!user) {
      // Ensure user exists before proceeding
      return;
    }

    const gameRef = ref(database, `games/${gameId}`);
    get(gameRef).then((snapshot) => {
      const game = snapshot.val();
      const gameData = {
        ...game,
        player_2_ID: user.uid,
        player_2_email: user.email,
        status: "playing",
        currentPlayer: 1,
      };
      set(gameRef, gameData).then(() => {
        navigate(`/game/${gameId}`);
      });
    });
  };

  // Helper function to filter games based on their status
  const filterGames = (games, status) => {
    return Object.values(games).filter((game) => game.status === status);
  };

  // Fetch games when the user is logged in
  useEffect(() => {
    if (user) {
      const gamesRef = ref(database, `games`);
      const unsubscribe = onValue(gamesRef, (snapshot) => {
        const games = snapshot.val();
        setActiveGames(filterGames(games, "playing"));
        setWaitingGames(filterGames(games, "waiting"));
      });

      return () => {
        // Unsubscribe from the database reference when component unmounts
        unsubscribe();
      };
    }
  }, [user]);

  // Function to render the game components based on the user's login status
  const renderGameComponents = () => {
    if (!isLoggedIn) {
      return <LandingPage />;
    }

    return (
      <>
        <div className="flex justify-center">
          <GameButton onClick={createGame} label="Create Game" />
        </div>
        <h2 className="text-xl font-semibold mb-4">Active Games:</h2>
        <GameList games={activeGames} />
        <h2 className="text-xl font-semibold mb-4">Waiting Games:</h2>
        <GameList games={waitingGames} joinGame={joinGame} />
      </>
    );
  };

  return <div>{renderGameComponents()}</div>;
};

export default Home;
