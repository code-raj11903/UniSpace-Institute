// App.jsx
import React, { useContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ResourcesPage from './pages/ResourcesPage';
import DepartmentsPage from './pages/DepartmentsPage';
import SettingsPage from './pages/SettingsPage'; 
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import OrdersPage from './pages/OrdersPage';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Set the default theme to light when the app loads
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, []);

  // Toggle dark mode and save the setting to localStorage
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      if (newMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
      }
      return newMode;
    });
  };

  return (
    <AuthProvider>
      <Router>
        <ToastContainer />
        <AppRoutes isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      </Router>
    </AuthProvider>
  );
};

// Separate component for routes and conditionally rendered components
const AppRoutes = ({ isDarkMode, toggleDarkMode }) => {
  const { user } = useContext(AuthContext); // Get the user from AuthContext
  const { pathname } = useLocation();

  return (
    <>
      {user && pathname !== '/login' && pathname !== '/register' && pathname !== '/' && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!user ? <RegisterPage /> : <Navigate to="/dashboard" />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
        />
        <Route
          path="/resources"
          element={<ProtectedRoute><ResourcesPage /></ProtectedRoute>}
        />
        <Route
          path="/departments"
          element={<ProtectedRoute><DepartmentsPage /></ProtectedRoute>}
        />
        <Route
          path="/orders"
          element={<ProtectedRoute><OrdersPage /></ProtectedRoute>}
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              {/* Pass dark mode toggling props to SettingsPage */}
              <SettingsPage isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
