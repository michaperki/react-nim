// components/Home.js
import React, { useState, useEffect } from 'react';
import { auth, database } from '../firebase';
import { useNavigate } from 'react-router-dom';
import ShortcutForm from './ShortcutForm';
import ShortcutList from './ShortcutList';
import { addShortcutToDatabase } from '../utils/firebaseUtils';
import { get, ref, onValue } from 'firebase/database';
import { PopularShortcutsContainer, ShortcutCard } from './styles/HomeStyles'; // Import the styles
import PopularShortcutsGrid from './PopularShortcutsGrid'; // Import the new component
import popularShortcutsData from '../public/popularShortcutsData';

const Home = ({ isLoggedIn, user }) => {
  const navigate = useNavigate();
  const [shortcuts, setShortcuts] = useState([]);

  const handleShortcutSubmit = (shortcut) => {
    // Add the user information to the shortcut before saving it to the database
    if (user) {
      const shortcutWithUser = { ...shortcut, userId: user.uid, userEmail: user.email };
      setShortcuts((prevShortcuts) => [...prevShortcuts, shortcutWithUser]);
      // Save the shortcut to the database
      addShortcutToDatabase(shortcut, user.uid, user.email);
    } else {
      console.error('User not logged in'); // Handle the case when the user is not logged in
    }
  };

  // Fetch existing shortcuts when the user logs in
  useEffect(() => {
    if (user) {
      const databaseRef = ref(database, `users/${user.uid}/shortcuts`);
      const unsubscribe = onValue(databaseRef, (snapshot) => {
        const shortcutsData = snapshot.val();
        if (shortcutsData) {
          const shortcutsArray = Object.values(shortcutsData);
          setShortcuts(shortcutsArray);
        } else {
          setShortcuts([]); // If no shortcuts found, set shortcuts to an empty array
        }
      });

      return () => unsubscribe(); // Cleanup the listener when the component unmounts
    }
  }, [user]);

  return (
    <>
      <nav>
        <div>
          {isLoggedIn ? (
            <div>
              <ShortcutForm onShortcutSubmit={handleShortcutSubmit} />
              <ShortcutList shortcuts={shortcuts} />
            </div>
          ) : (
            <PopularShortcutsContainer>
                <h2>Popular Shortcuts</h2>
                <PopularShortcutsGrid popularShortcuts={popularShortcutsData}/>
            </PopularShortcutsContainer>
          )}
        </div>
      </nav>
    </>
  );
};

export default Home;
