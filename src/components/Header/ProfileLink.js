import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const ProfileLink = () => {
  const { user } = useAuth();

  if (!user) {
    return null; // Render nothing if the user is not logged in
  }

  return (
    <Link to="/profile" className="flex items-center space-x-2">
      <span>Profile</span>
    </Link>
  );
};

export default ProfileLink;
