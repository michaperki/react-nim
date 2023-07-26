import { useEffect, useState } from "react";
import { ref, get, onValue, push, set } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { database } from "../firebase";

export const useGameManagement = (user) => {
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

  const filterGames = (games, status) => {
    return Object.values(games).filter((game) => game.status === status);
  };

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

  return { activeGames, waitingGames, createGame, joinGame };
};
