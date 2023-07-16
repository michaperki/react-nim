import React, { useState } from 'react';
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import ShortcutForm from "./ShortcutForm";
import ShortcutList from "./ShortcutList";
import { addShortcutToDatabase } from "../utils/firebaseUtils";

const Home = ({ isLoggedIn, logOutUser }) => {
  const navigate = useNavigate();
  const [shortcuts, setShortcuts] = useState([]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        // An error happened.
      });
    logOutUser();
  };

  const handleShortcutSubmit = (shortcut) => {
    setShortcuts((prevShortcuts) => [...prevShortcuts, shortcut]);
    // Save the shortcut to the database using the appropriate method (e.g., Firebase Firestore, Axios to a server, etc.)
    // Example: You can use addShortcutToDatabase(shortcut) here (refer to previous code)
    addShortcutToDatabase(shortcut);
  };

  return (
    <>
      <nav>
        <p>Welcome Home</p>

        <div>
          {isLoggedIn ? (
            <div>
              <ShortcutForm onShortcutSubmit={handleShortcutSubmit} />
              <button onClick={() => handleLogout()}>Log Out</button>
                <ShortcutList shortcuts={shortcuts} />
            </div>
          ) : (
            <h2>Join Us!</h2>
          )}
        </div>
      </nav>
    </>
  );
};

export default Home;
