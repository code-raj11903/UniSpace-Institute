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
    <nav className="navbar bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="navbar-left">
        <Link to="/App" className="text-xl font-semibold hover:text-gray-300">
          {userType === 1 ? "Institute Dashboard" : "Department Dashboard"}
        </Link>
      </div>
      {/* Hamburger Icon for Mobile Menu */}
      <button className="block md:hidden" onClick={toggleMenu}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <div className={`navbar-right flex flex-col md:flex-row items-center ${isMenuOpen ? "block" : "hidden"} md:block`}>
        {userType === 1 && (
          <div className="relative group">
            <button className="hover:text-gray-300 px-4 py-2">Departments</button>
            <div className="absolute hidden group-hover:block bg-white text-black py-2 rounded shadow-md">
              <Link to="/departments/add" className="block px-6 py-2 hover:bg-gray-200">Add Department</Link>
              <Link to="/departments/list" className="block px-6 py-2 hover:bg-gray-200">Department List</Link>
            </div>
          </div>
        )}
        
        <div className="relative group">
          <button className="hover:text-gray-300 px-4 py-2">Profile Management</button>
          <div className="absolute hidden group-hover:block bg-white text-black py-2 rounded shadow-md">
            <Link to="/profile-management/update" className="block px-4 py-2 hover:bg-gray-200">Update Profile</Link>
            <Link to="/profile-management/orders" className="block px-4 py-2 hover:bg-gray-200">Order History</Link>
          </div>
        </div>
        
        <div className="relative group">
          <button className="hover:text-gray-300 px-4 py-2">{userType === 1 ? "Institute Resources" : "Department Resources"}</button>
          <div className="absolute hidden group-hover:block bg-white text-black py-2 rounded shadow-md">
            <Link to="/add-resource" className="block px-4 py-2 hover:bg-gray-200">
              {userType === 1 ? "Add Resource" : "Request Resource"}
            </Link>
            <Link to="/resource-list" className="block px-4 py-2 hover:bg-gray-200">Resource List</Link>
          </div>
        </div>
        
        <button onClick={handleLogout} className="hover:text-gray-300 px-4 py-2">Logout</button>
      </div>

      {/* Logout success message */}
      {showLogoutMessage && (
        <div className="logout-message fixed top-4 right-4 bg-green-500 text-white p-2 mt-4 rounded shadow-lg">
          Logout Successful
        </div>
      )}
    </nav>
  );
};

export default Navbar;
