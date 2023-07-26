export const createNewGame = (player1ID, player2ID) => {
    const piles = [1, 3, 5, 7]; // Set the initial piles
    const gameData = {
      player_1_ID: player1ID,
      player_2_ID: player2ID,
      currentPlayer: "player_1",
      piles,
      status: "playing",
    };
  
    const newGameRef = push(ref(database, "games"));
    set(newGameRef, gameData);
  
    return newGameRef.key;
  };