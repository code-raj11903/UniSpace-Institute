import React, { createContext, useState } from 'react';

// Create the AuthContext
export const AuthContext = createContext();

// Create the AuthProvider component that will wrap around your app
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState(null); // 'institute' or 'department'

  // Function to log in
  const login = (type) => {
    setIsAuthenticated(true);
    setUserType(type);
  };

  // Function to log out
  const logout = () => {
    setIsAuthenticated(false);
    setUserType(null);
  };

  // Provide the context to child components
  return (
    <AuthContext.Provider value={{ isAuthenticated, userType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
