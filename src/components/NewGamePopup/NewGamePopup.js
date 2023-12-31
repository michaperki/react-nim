import React from "react";

const NewGamePopup = ({ winner, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Game Over</h2>
        {winner ? (
          <p className="text-xl mb-4">Player {winner} wins!</p>
        ) : (
          <p className="text-xl mb-4">It's a tie!</p>
        )}
        {/* Close button */}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default NewGamePopup;
