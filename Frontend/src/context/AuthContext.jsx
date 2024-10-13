import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);


  useEffect(() => {
    // Check if there's a token and role in localStorage on app load
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    const role = localStorage.getItem('usertype');

    if (token && storedUser && role) {
      setUser({ ...JSON.parse(storedUser), role }); // Set user state from localStorage
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
