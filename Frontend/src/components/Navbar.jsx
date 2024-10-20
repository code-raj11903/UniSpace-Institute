import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import logo from '../assets/UniSpaceLogo.png';
import './Custom.css';
import profileAvatar from '../assets/6858504.png';

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext); // Use setUser from context
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/v1/${user.role}/logout`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Logout failed');
      }

      // Remove stored items
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('usertype');

      setUser(null); // Set user in context to null
      toast.success('Logout successful!');
      navigate('/login');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <header className="navbar-container">
      <div className="navbar-logo">
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="UniSpace Logo" className="navbar-logo-image" />
        </Link>
        <h1 className="navbar-title">UniSpace</h1>
      </div>

      {/* Only show navbar links if the user is logged in */}
      {user && (
        <nav className="navbar-links">
          <Link to="/dashboard" className="navbar-link">
            Dashboard
          </Link>
          <Link to="/resources" className="navbar-link">
            Resources
          </Link>
          {user?.role === 'institute' && (
            <Link to="/departments" className="navbar-link">
              Manage Departments
            </Link>
          )}
          <Link to="/orders" className="navbar-link">
            Orders
          </Link>
        </nav>
      )}

      {/* Profile Dropdown, only show when user is logged in */}
      {user && (
        <div className="navbar-profile">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="navbar-profile-button"
          >
            {/* Profile Icon using an Image */}
            <img
              src={profileAvatar}  // Correct path for the avatar
              alt="Profile"
              className="navbar-profile-avatar"
            />
          </button>

          {isDropdownOpen && (
            <div className="navbar-dropdown">
              <Link
                to="/settings"
                className="navbar-dropdown-item"
                onClick={() => setIsDropdownOpen(false)}
              >
                Settings
              </Link>
              <button onClick={handleLogout} className="navbar-dropdown-item">
                Log out
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
