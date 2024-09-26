import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/UniSpaceLogo.png';  // Import logo

const Header = () => {
  return (
    <header className="bg-gray-200 shadow-lg p-4 flex justify-around items-center space-x- 10">
      <div className="flex items-center mx-1 ">
        <Link to="/" className="text-xl font-bold flex items-center">
          <img src={logo} alt="UniSpace Logo" className="w-10 h-10 mr-2" />
          <h1 className="text-2xl font-bold">UniSpace</h1>
        </Link>
      </div>
  
      <nav>
        <ul className="flex space-x-12 ">
          <li><a href="#features" className="hover:text-blue-600">Features</a></li>
          <li><a href="#about" className="hover:text-blue-600">About Us</a></li>
          <li><a href="#pricing" className="hover:text-blue-600">Pricing</a></li>
        </ul>
      </nav>
      <div>
        <a href="/login" className="px-4 py-2 text-blue-600 border rounded-md hover:bg-blue-600 hover:text-white transition">Log In</a>
        <a href="/register" className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 hover:text-black transition">List Your Resources</a>
      </div>
    </header>
  );
};

export default Header;
