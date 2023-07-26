import React from "react";
import { FaCat, FaDog, FaFish, FaHorse, FaKiwiBird } from "react-icons/fa";

const Avatar = ({ selectedAvatar, onSelectAvatar }) => {
  const avatars = [
    { name: "Cat", icon: <FaCat />, value: "cat" },
    { name: "Dog", icon: <FaDog />, value: "dog" },
    { name: "Fish", icon: <FaFish />, value: "fish" },
    { name: "Horse", icon: <FaHorse />, value: "horse" },
    { name: "Kiwi Bird", icon: <FaKiwiBird />, value: "kiwi" },
  ];

  return (
    <div className="flex items-center justify-center space-x-4">
      {avatars.map((avatar) => (
        <div
          key={avatar.value}
          className={`cursor-pointer rounded-full p-2 ${
            selectedAvatar === avatar.value ? "bg-blue-500" : "bg-gray-300"
          }`}
          onClick={() => onSelectAvatar(avatar.value)}
        >
          {avatar.icon}
        </div>
      ))}
    </div>
  );
};

export default Avatar;
