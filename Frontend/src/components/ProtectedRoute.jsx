import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext); // Get user from context

  if (!user) {
    // If no user, redirect to login
    return <Navigate to="/login" />;
  }

  return children; // Render the protected route if the user is authenticated
};

export default ProtectedRoute;
