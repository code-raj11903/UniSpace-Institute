import React, { useState, useEffect,useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import logo from '../assets/UniSpaceLogo.png';
import './custom.css';
import profileAvatar from '../assets/6858504.png';

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // For mobile menu
  const navigate = useNavigate();
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false); // Automatically close the mobile menu
      }
    };

    window.addEventListener('resize', handleResize); // Add event listener

    return () => {
      window.removeEventListener('resize', handleResize); // Clean up the event listener
    };
  }, []);
  function handleClick()
  {
  isMobileMenuOpen ? setIsMobileMenuOpen(!isMobileMenuOpen):setIsMobileMenuOpen(isMobileMenuOpen) 
  };

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

      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('usertype');

      setUser(null);
      toast.success('Logout successful!');
      navigate('/login');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <header className="navbar-container">
      {/* Logo and title visible on desktop */}
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="UniSpace Logo" className="navbar-logo-image" />
          <h1 className="navbar-title">UniSpace</h1>
        </Link>
      </div>

      {/* Hamburger Menu for Mobile */}
      <button
        className="navbar-toggle"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <span className="navbar-toggle-icon">☰</span>
      </button>

      {/* Mobile Menu Links */}
      <nav className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
        {isMobileMenuOpen && (
          <div className="navbar-logo-mobile">
            {/* Logo and title inside the hamburger menu */}
            <Link to="/" className="navbar-logo">
              <img src={logo} alt="UniSpace Logo" className="navbar-logo-image" />
              <h1 className="navbar-title">UniSpace</h1>
            </Link>
          </div>
        )}

        {user && (
          <>
            <Link to="/dashboard" className="navbar-link" onClick={()=>handleClick()}>
              Dashboard
            </Link>
            <Link to="/resources" className="navbar-link" onClick={()=>handleClick()}>
              Resources
            </Link>
            {user?.role === 'institute' && (
              <Link to="/departments" className="navbar-link"onClick={()=>handleClick()}>
                Manage Departments
              </Link>
            )}
            <Link to="/orders" className="navbar-link"onClick={()=>handleClick()}>
              Orders
            </Link>
          </>
        )}
      </nav>

      {/* Profile Dropdown */}
      {user && (
        <div className="navbar-profile">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="navbar-profile-button"
          >
            <img
              src={profileAvatar}
              alt="Profile"
              className="navbar-profile-avatar"
            />
          </button>

          {isDropdownOpen && (
            <div className="navbar-dropdown">
              <button
            
                className="navbar-dropdown-item"
                onClick={() => {setIsDropdownOpen(false)
                  navigate('/settings');}}
              >
                Settings
              </button>
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
