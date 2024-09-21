import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const handleLogout = () => {
    console.log("User logged out");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/App" className="hover:text-gray-300">
          Institute Dashboard
        </Link>
      </div>
      <div className="navbar-right">
        <div className="relative group">
          <button className="hover:text-gray-300">Departments</button>
          <div className="absolute hidden group-hover:block bg-white text-black py-2 rounded shadow-md">
            <Link to="/departments/add" className="block px-6 py-2 hover:bg-gray-200">Add Department</Link>
            <Link to="/departments/list" className="block px-6 py-2 hover:bg-gray-200">Department List</Link>
          </div>
        </div>
        <div className="relative group">
          <button className="hover:text-gray-300">Profile Management</button>
          <div className="absolute hidden group-hover:block bg-white text-black py-2 rounded shadow-md">
            <Link to="/profile-management/update" className="block px-4 py-2 hover:bg-gray-200">Update Profile</Link>
            <Link to="/profile-management/orders" className="block px-4 py-2 hover:bg-gray-200">Order History</Link>
          </div>
        </div>
        <div className="relative group">
          <button className="hover:text-gray-300">Institute Resources</button>
          <div className="absolute hidden group-hover:block bg-white text-black py-2 rounded shadow-md">
            <Link to="/add-resource" className="block px-4 py-2 hover:bg-gray-200">Add Resource</Link>
            <Link to="/resource-list" className="block px-4 py-2 hover:bg-gray-200">Resource List</Link>
          </div>
        </div>
        <button onClick={handleLogout} className="hover:text-gray-300">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
