import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
// import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DepartmentDashboard from './components/DepartmentDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from "../src/context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><DepartmentDashboard /></ProtectedRoute>} />
      </Routes>
    </Router>
    </AuthProvider>
  );
};

export default App;