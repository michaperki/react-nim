import React, { useState, useEffect } from "react";
import { auth, database, set } from "../firebase";
import { useNavigate } from "react-router-dom";
import { get, ref, onValue, push } from "firebase/database";
import LandingPage from "./LandingPage";
import ActiveGames from "./ActiveGames";
import WaitingGames from "./WaitingGames";

const Home = ({ isLoggedIn, user }) => {
  const navigate = useNavigate();
  const [activeGames, setActiveGames] = useState([]);
  const [waitingGames, setWaitingGames] = useState([]);

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

  const getGames = () => {
    const gamesRef = ref(database, `games`);
    onValue(gamesRef, (snapshot) => {
      const games = snapshot.val();
      const activeGames = [];
      const waitingGames = [];
      for (const game in games) {
        if (games[game].status === "waiting") {
          waitingGames.push(games[game]);
        } else if (games[game].status === "playing") {
          activeGames.push(games[game]);
        }
      }
      setActiveGames(activeGames);
      setWaitingGames(waitingGames);
    });
  };

  useEffect(() => {
    if (user) {
      getGames();
    }
  }, [user]);

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <div className="flex justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => createGame()}
            >
              Create Game
            </button>
          </div>
          <ActiveGames activeGames={activeGames} />
          <WaitingGames waitingGames={waitingGames} joinGame={joinGame} />
        </div>
      ) : (
        <div>
          <LandingPage />
        </div>
      )}
    </div>
  );
};

export default Home;