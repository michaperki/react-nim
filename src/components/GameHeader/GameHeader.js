import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase";
import "./GameHeader.css";
import { IconContext } from "react-icons"; // Import IconContext from react-icons
import {
  FaUser,
  FaCat,
  FaDog,
  FaFish,
  FaHorse,
  FaKiwiBird,
} from "react-icons/fa";

// Mapping of avatar names to corresponding react-icons components
const avatarIcons = {
  cat: <FaCat />,
  dog: <FaDog />,
  fish: <FaFish />,
  horse: <FaHorse />,
  kiwi: <FaKiwiBird />,
};

const GameHeader = ({ player1, player2 }) => {
  const [user1Profile, setUser1Profile] = useState(null);
  const [user2Profile, setUser2Profile] = useState(null);

  useEffect(() => {
    // Function to fetch user profile from Firestore
    const fetchUserProfile = async (userId, setUserProfile) => {
      const q = query(
        collection(firestore, "users"),
        where("userId", "==", userId)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUserProfile(doc.data());
      });
    };

    // Fetch user profiles
    if (player1) {
      fetchUserProfile(player1, setUser1Profile);
    }
    if (player2) {
      fetchUserProfile(player2, setUser2Profile);
    }
  }, [player1, player2]);

  return (
    <div className="game-header">
      <div className="player-info">
        <span className="player-label">Player 1:</span>
        {user1Profile && (
          <IconContext.Provider value={{ size: "2em" }}>
            <div className="avatar">
              {avatarIcons[user1Profile.selectedAvatar] || (
                <FaUser size="2em" />
              )}
              {/* Use the default icon here */}
            </div>
          </IconContext.Provider>
        )}
        <span className="player-name">{user1Profile?.screenName}</span>
      </div>
      <div className="player-info">
        <span className="player-label">Player 2:</span>
        {user2Profile ? (
          <>
            <IconContext.Provider value={{ size: "2em" }}>
              <div className="avatar">
                {avatarIcons[user2Profile.selectedAvatar] || (
                  <FaUser size="2em" />
                )}
                {/* Use the default icon here */}
              </div>
            </IconContext.Provider>
            <span className="player-name">{user2Profile?.screenName}</span>
          </>
        ) : (
          <span className="waiting-text">Waiting...</span>
        )}
      </div>
    </div>
  );
};

export default GameHeader;
