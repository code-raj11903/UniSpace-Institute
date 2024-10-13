import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate , useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
// import Dashboard from './pages/Dashboard'; 
import ResourcesPage from './pages/ResourcesPage';
import DepartmentsPage from './pages/DepartmentsPage';
// import OrdersPage from './pages/OrdersPage';
import SettingsPage from './pages/SettingsPage';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import DepartmentDashboard from  './components/DepartmentDashboard';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer />
        <AppRoutes /> {/* Moved routes and navbar logic to a separate component */}
      </Router>
    </AuthProvider>
  );
};


// Separate component for routes and conditionally rendered components
const AppRoutes = () => {
  const { user } = useContext(AuthContext); // Get the user from AuthContext
  const { pathname } = useLocation();
  return (
    <>
    {user && pathname !== '/login' && pathname !== '/register' && pathname !== '/' && <Navbar/>} 
      <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={ !user ? <LoginPage />: <Navigate to='/dashboard' />} />
          <Route path="/register" element={!user? <RegisterPage />: <Navigate to='/dashboard' />} />
        
          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={<ProtectedRoute><DepartmentDashboard /></ProtectedRoute>}
          />
          <Route
            path="/resources"
            element={<ProtectedRoute><ResourcesPage /></ProtectedRoute>}
          />
          <Route
            path="/departments"
            element={<ProtectedRoute><DepartmentsPage /></ProtectedRoute>}
          />
          {/* <Route
            path="/orders"
            element={<ProtectedRoute><OrdersPage /></ProtectedRoute>}
          /> */}
          <Route
            path="/settings"
            element={<ProtectedRoute><SettingsPage /></ProtectedRoute>}
          />
        </Routes>
    </>
  );
};

export default App;
