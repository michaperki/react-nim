import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ isLoggedIn, onLogout }) => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        Shortcut Tracker
      </Link>
      {isLoggedIn ? (
        <button
          className="bg-red-600 text-white px-4 py-2 rounded-md cursor-pointer"
          onClick={() => onLogout()}
        >
          Log Out
        </button>
      ) : (
        <ul className="flex space-x-4">
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Header;
