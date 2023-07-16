import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ isLoggedIn, onLogout, isMenuOpen, handleSidebarClose }) => {
  return (
    <div
      className={`fixed left-0 top-0 bottom-0 bg-gray-800 w-64 p-4 ${
        isMenuOpen ? "sidebar-open" : "sidebar-closed"
      }`}
      style={{ zIndex: 20 }} // Set z-index for the sidebar
    >
      <nav className="space-y-4">
        {isLoggedIn ? (
          <button
            className="text-white text-lg font-semibold py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
            onClick={() => {
              onLogout();
              handleSidebarClose(); // Close the sidebar after clicking Logout
            }}
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="text-white text-lg font-semibold py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
              onClick={handleSidebarClose} // Close the sidebar after clicking Login
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-white text-lg font-semibold py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
              onClick={handleSidebarClose} // Close the sidebar after clicking Signup
            >
              Sign Up
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
