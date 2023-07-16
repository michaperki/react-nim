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
  const [user, setUser] = useState(null);

  // Function to handle user login
  const handleLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
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
    setUser(null);
    setIsLoggedIn(false);
  };

  // Check if the user is already logged in when the app starts
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div>
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <section>
          <Routes>
            <Route path="/" element={<Home isLoggedIn={isLoggedIn} user={user} />} />
            {/* Define the route for "/home" */}
            <Route path="/home" element={<Home isLoggedIn={isLoggedIn} user={user} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login handleUserLogin={handleLogin} />} />
            {/* ... Other routes */}
          </Routes>
        </section>
      </div>
    </Router>
  );
}

export default App;
