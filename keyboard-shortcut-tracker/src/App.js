// App.js
import React, { useState, useEffect } from 'react';
import Home from './components/HomePage';
import Signup from './components/Signup';
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // New state to store user information

  // Function to handle user login
  const handleLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUser(user); // Save user information in state
        setIsLoggedIn(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
  };

  // Function to handle user logout
  const handleLogout = () => {
    // Perform any logout logic (e.g., clearing authentication tokens, etc.)
    setUser(null); // Clear user information from state
    setIsLoggedIn(false);
  };

  // Check if the user is already logged in when the app starts
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUser(user); // Pass the user information to handleLogin
        setIsLoggedIn(true);
      } else {
        // User is signed out
        setUser(null);
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe(); // Cleanup the listener when the component unmounts
  }, []);

  return (
    <Router>
      <div>
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} /> {/* Pass isLoggedIn and onLogout props to Header */}
        <section>
          <Routes>
            {/* Pass isLoggedIn and handleLogin props to Home and Login components */}
            <Route
              path="/"
              element={<Home isLoggedIn={isLoggedIn} user={user} />} // Pass user information to Home
            />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/login"
              element={<Login onLogin={handleLogin} />} // Pass handleLogin function to Login
            />
          </Routes>
        </section>
      </div>
    </Router>
  );
}

export default App;
