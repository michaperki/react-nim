import React, { useState } from "react";
import Home from "./components/HomePage";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header"; // Import the Header component

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle user logout
  const handleLogout = () => {
    // Perform any logout logic (e.g., clearing authentication tokens, etc.)
    setIsLoggedIn(false);
    
  };

  // Function to handle user login (you'll replace this with your actual login logic)
  const handleLogin = () => {
    // Perform any login logic (e.g., setting authentication tokens, etc.)
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <div>
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <section>
          <Routes>
            {/* Pass isLoggedIn and handleLogin props to Home and Login components */}
            <Route path="/" element={<Home isLoggedIn={isLoggedIn} logOutUser={handleLogout}/>} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/login"
              element={<Login handleLogin={handleLogin} />}
            />
          </Routes>
        </section>
      </div>
    </Router>
  );
}

export default App;
