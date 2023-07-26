import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

// Create the AuthContext
const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Set up an observer for the user authentication state
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    // Unsubscribe the observer when the component unmounts
    return () => unsubscribe();
  }, []);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};

// Create a custom hook to consume the AuthContext
export const useAuth = () => useContext(AuthContext);
