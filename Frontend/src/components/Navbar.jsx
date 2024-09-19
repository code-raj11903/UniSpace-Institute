import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-white text-lg font-bold">Institute Dashboard</Link>
          <div>
            <Link to="/" className="text-gray-300 hover:text-white mx-2">Home</Link>
            <Link to="/departments" className="text-gray-300 hover:text-white mx-2">Departments</Link>
            <Link to="/profile-management" className="text-gray-300 hover:text-white mx-2">Profile Management</Link>
            <Link to="/resources" className="text-gray-300 hover:text-white mx-2">Institute Resources</Link>
            <Link to="/orders" className="text-gray-300 hover:text-white mx-2">Orders</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
