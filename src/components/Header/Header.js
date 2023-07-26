import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar";
import ProfileLink from "./ProfileLink";

const Header = ({ isLoggedIn, onLogout, userProfile }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
<header className="py-4 px-6 bg-gray-900 text-white">
      <div className="flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <h1 className="text-xl font-semibold">Nim</h1>
        </Link>
        {/* Mobile Menu */}
        <div className="md:hidden">
          <button
            className="text-white hover:text-gray-200 transition-colors"
            onClick={handleMenuToggle}
          >
            {/* ... */}
          </button>
        </div>
        {/* Desktop Menu */}
        <nav
          className={`hidden md:flex space-x-4 ${
            isMenuOpen ? "flex justify-end" : "hidden"
          }`}
        >
          {isLoggedIn ? (
            <>
              <ProfileLink /> {/* Add the ProfileLink component */}
              <button
                className="bg-transparent hover:bg-white text-white hover:text-gray-900 border border-white hover:border-transparent rounded-md px-4 py-2 transition-colors"
                onClick={onLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-white text-gray-900 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-white text-gray-900 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
      {/* Sidebar for Mobile */}
      <div className={`sidebar md:hidden`}>
        <Sidebar
          isLoggedIn={isLoggedIn}
          onLogout={onLogout}
          isMenuOpen={isMenuOpen}
          handleSidebarClose={() => setIsMenuOpen(false)} // Pass the function to close the sidebar
        />
      </div>
    </header>
  );
};

export default Header;
