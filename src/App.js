import React, { useState, useEffect } from "react";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase";
import NimGame from "./components/NimGame";
import UserProfile from "./components/Profile/UserProfile";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Function to handle user login
  const handleLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUser(user);
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
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setUser(null);
        setIsLoggedIn(false);
      })
      .catch((error) => {
        // An error happened.
      });
  };

  // Check if the user is already logged in when the app starts
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUser(user);
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
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <section>
          <Routes>
            <Route
              path="/"
              element={<Home isLoggedIn={isLoggedIn} user={user} />}
            />
            <Route exact path="/profile" element={<UserProfile user={user}/>} />

            <Route path="/signup" element={<Signup />} />
            <Route
              path="/login"
              element={<Login handleUserLogin={handleLogin} />}
            />
            <Route
              path="/home"
              element={<Home isLoggedIn={isLoggedIn} user={user} />}
            />
            <Route path="/game/:gameId" element={<NimGame user={user} />} />
          </Routes>
        </section>
      </div>
    </Router>
  );
}

export default App;
