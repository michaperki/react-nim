import React, { useState, useEffect } from "react";
import Avatar from "../Avatar";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { firestore } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";

const UserProfile = () => {
  const { user } = useAuth();
  const [screenName, setScreenName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("cat"); // Default avatar

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) return;

      const userProfileRef = doc(firestore, "users", user.uid);
      try {
        const userProfileSnapshot = await getDoc(userProfileRef);
        if (userProfileSnapshot.exists()) {
          const userProfileData = userProfileSnapshot.data();
          setScreenName(userProfileData.screenName);
          setSelectedAvatar(userProfileData.selectedAvatar || "cat"); // Use default avatar if not set
        }
      } catch (error) {
        console.error("Error fetching user profile: ", error);
      }
    };

    fetchUserProfile();
  }, [user]);

  const handleScreenNameChange = (event) => {
    setScreenName(event.target.value);
  };

  const handleAvatarSelect = (avatarValue) => {
    setSelectedAvatar(avatarValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      console.error("User not logged in");
      return;
    }

    const userProfileRef = doc(firestore, "users", user.uid);
    const userProfileData = {
      screenName,
      selectedAvatar: selectedAvatar,
      userId: user.uid,
    };

    try {
      // Check if the user profile already exists in the database
      const userProfileSnapshot = await getDoc(userProfileRef);

      if (userProfileSnapshot.exists()) {
        // If the profile exists, update it with the new data
        await setDoc(userProfileRef, userProfileData, { merge: true });
        console.log("Document successfully updated!");
      } else {
        // If the profile does not exist, create a new one with the data
        await setDoc(userProfileRef, userProfileData);
        console.log("Document successfully written!");
      }
    } catch (error) {
      console.error("Error writing document: ", error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">User Profile</h1>
      <form onSubmit={handleSubmit}>
        {/* Form inputs */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-1" htmlFor="screenName">
            Screen Name:
          </label>
          <input
            type="text"
            id="screenName"
            value={screenName}
            onChange={handleScreenNameChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-1" htmlFor="avatar">
            Select an Avatar:
          </label>
          <Avatar
            selectedAvatar={selectedAvatar}
            onSelectAvatar={handleAvatarSelect}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
