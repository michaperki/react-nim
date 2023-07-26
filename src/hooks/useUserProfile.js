// src/hooks/useUserProfile.js
import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";

const useUserProfile = (userId) => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!userId) return;

      const q = query(
        collection(firestore, "users"),
        where("userId", "==", userId)
      );
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setUserProfile(doc.data());
      });
    };

    fetchUserProfile();
  }, [userId]);

  return userProfile;
};

export default useUserProfile;
