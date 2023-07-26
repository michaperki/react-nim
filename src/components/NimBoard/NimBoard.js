// NimBoard.js

import React from "react";
import { useParams } from "react-router-dom";

const NimBoard = () => {
  const { gameId } = useParams();

  return (
    <main className="flex justify-center h-screen">
      <section>
        <div className="bg-white p-6 shadow-md rounded-md">
          <h1 className="text-2xl font-semibold mb-4">Nim Game</h1>
          <div className="mb-4">
            <p className="block text-gray-700 font-medium">Game ID: {gameId}</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NimBoard;
