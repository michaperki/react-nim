import React, { useState, useEffect } from "react";
import { auth, database, set } from "../firebase";
import { useNavigate } from "react-router-dom";
import ShortcutForm from "./ShortcutForm";
import ShortcutList from "./ShortcutList";
import { addShortcutToDatabase } from "../utils/firebaseUtils";
import { get, ref, onValue, push } from "firebase/database";
import PopularShortcutsGrid from "./PopularShortcutsGrid"; // Import the new component
import popularShortcutsData from "../public/popularShortcutsData";

const Home = ({ isLoggedIn, user }) => {
  const navigate = useNavigate();
  const [shortcuts, setShortcuts] = useState([]);

  const handleShortcutSubmit = (shortcut) => {
    // Add the user information to the shortcut before saving it to the database
    if (user) {
      const shortcutWithUser = {
        ...shortcut,
        userId: user.uid,
        userEmail: user.email,
        deleted: false, // Set the initial value of 'deleted' to false
      };

      // Save the shortcut to the database using push to generate a unique key
      const databaseRef = ref(database, `users/${user.uid}/shortcuts`);
      const newShortcutRef = push(databaseRef);
      set(newShortcutRef, shortcutWithUser)
        .then(() => {
          // Add the generated key to the shortcut object
          const newShortcut = { ...shortcutWithUser, key: newShortcutRef.key };
          setShortcuts((prevShortcuts) => [...prevShortcuts, newShortcut]);
        })
        .catch((error) => {
          console.error("Error saving shortcut:", error);
        });
    } else {
      console.error("User not logged in"); // Handle the case when the user is not logged in
    }
  };
  const handleDeleteShortcut = (shortcutToDelete) => {
    // Mark the shortcut as deleted in the database
    if (user && shortcutToDelete.key) {
      const databaseRef = ref(database, `users/${user.uid}/shortcuts/${shortcutToDelete.key}`);
      set(databaseRef, { deleted: true }, { merge: true })
        .then(() => {
          // Shortcut marked as deleted successfully
          // Remove the deleted shortcut from the state
          setShortcuts((prevShortcuts) =>
            prevShortcuts.filter((shortcut) => shortcut.key !== shortcutToDelete.key)
          );
        })
        .catch((error) => {
          console.error('Error marking shortcut as deleted:', error);
        });
    }
  };

  // Fetch existing shortcuts when the user logs in
  useEffect(() => {
    if (user) {
      const databaseRef = ref(database, `users/${user.uid}/shortcuts`);
      const unsubscribe = onValue(databaseRef, (snapshot) => {
        const shortcutsData = snapshot.val();
        if (shortcutsData) {
          // Get the existing shortcuts from the database
          const shortcutsArray = Object.values(shortcutsData);

          // Filter out deleted shortcuts and those that already exist in the state
          const filteredShortcuts = shortcutsArray.filter(
            (shortcut) =>
              !shortcut.deleted &&
              !shortcuts.some((s) => s.key === shortcut.key)
          );

          // Update the state with the new shortcuts
          setShortcuts((prevShortcuts) => [
            ...prevShortcuts,
            ...filteredShortcuts,
          ]);
        } else {
          setShortcuts([]); // If no shortcuts found, set shortcuts to an empty array
        }
      });

      return () => unsubscribe(); // Cleanup the listener when the component unmounts
    }
  }, [user]);

  return (
    <>
      <div>
        {isLoggedIn ? (
          <div>
            <ShortcutForm onShortcutSubmit={handleShortcutSubmit} />
            <ShortcutList
              shortcuts={shortcuts}
              onDeleteShortcut={handleDeleteShortcut}
            />
          </div>
        ) : (
          <div className="py-4 px-6 bg-gray-200">
            <h2 className="text-xl font-semibold mb-4">Popular Shortcuts</h2>
            <div className="grid grid-cols-2 gap-4">
              {popularShortcutsData.map((shortcut, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md p-4 hover:scale-105 transition-transform cursor-pointer"
                >
                  <div className="text-gray-700 font-medium mb-2">
                    {shortcut.title}
                  </div>
                  <div className="flex items-center space-x-2">
                    {shortcut.keys.map((key, keyIndex) => (
                      <div
                        key={keyIndex}
                        className="rounded-md border border-gray-300 p-1 text-sm w-10 text-center"
                      >
                        {key}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center mt-2">
                    <img
                      src={shortcut.logo}
                      alt="App Logo"
                      className="w-6 h-6 mr-2"
                    />
                    <span className="text-gray-600 text-sm">
                      {shortcut.application}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
