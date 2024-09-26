import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ userType }) => {
  const [showLogoutMessage, setShowLogoutMessage] = useState(false); // State to show/hide logout message
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for toggling the mobile menu

  const handleLogout = () => {
    console.log("User logged out");
    setShowLogoutMessage(true); // Show logout success message when clicked

    // Hide the message after 3 seconds
    setTimeout(() => {
      setShowLogoutMessage(false);
    }, 3000);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle mobile menu
  };

  return (
    
    <nav className="bg-blue-600 p-4 text-white">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">UniSpace</h1>
        <div>
          <Link to="/" className="mx-2">Dashboard</Link>
          <Link to="/departments" className="mx-2">Departments</Link>
          <Link to="/resources" className="mx-2">Resources</Link>
          <Link to="/orders" className="mx-2">Order History</Link>
          <Link to="/profile" className="mx-2">Profile</Link>
        </div>
      </div>
    </nav>
 
  );
};

export default Navbar;
