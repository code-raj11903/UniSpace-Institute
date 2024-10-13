//src/components/Navbar.jsx

import React, { useState , useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import logo from '../assets/UniSpaceLogo.png';
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
   

    <header className="bg-gray-200 shadow-lg p-4 flex justify-around items-center space-x- 10">
       <div className="flex items-center mx-1 ">
        <Link to="/dashboard" className="text-xl font-bold flex items-center">
          <img src={logo} alt="UniSpace Logo" className="w-10 h-10 mr-2" />
          <h1 className="text-2xl font-bold">UniSpace</h1>
        </Link>
      </div>
  
      <nav className="flex space-x-12"> 
  
        <Link to="/dashboard" className="hover:bg-blue-500 p-2 rounded">Dashboard</Link>
        <Link to="/resources" className="hover:bg-blue-500 p-2 rounded">Resources</Link>
        {user?.role === 'institute' && (
          <Link to="/departments" className="hover:bg-blue-500 p-2 rounded">Manage Departments</Link>
        )}
        <Link to="/orders" className="hover:bg-blue-500 p-2 rounded">Orders</Link>
      </nav>
      
      {/* Profile Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full"
        >
          {/* <img
            src={profileIcon} 
            alt="Profile"
            className="rounded-full w-full h-full" /> */}
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
            <Link to="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-200"  onClick={()=> setIsDropdownOpen(false)}>Settings</Link>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
            >
              Log out
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;


