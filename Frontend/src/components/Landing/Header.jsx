import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/UniSpaceLogo.png';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-gradient-to-r from-blue-800 via-blue-600 to-blue-400 shadow-md p-3 lg:px-8 flex justify-between items-center">
      {/* Logo and Title */}
      <div className="flex items-center">
        <Link to="/" className="text-xl font-bold flex items-center text-white">
          <img src={logo} alt="UniSpace Logo" className="w-12 h-12 mr-2" />
          <h1 className="text-3xl font-bold">UniSpace</h1>
        </Link>
      </div>
      
      {/* Nav Links */}
      <nav className="hidden lg:flex space-x-10">
        <a href="#features" className="text-white hover:text-yellow-300 transition">Features</a>
        <a href="#about" className="text-white hover:text-yellow-300 transition">About Us</a>
        <a href="#pricing" className="text-white hover:text-yellow-300 transition">Pricing</a>
      </nav>
      
      {/* Action Buttons */}
      <div className="hidden lg:flex space-x-4">
        <a href="/login" className="px-4 py-2 text-blue-600 bg-white border rounded-md hover:bg-gray-500 transition">Log In</a>
        <a href="/register" className="px-4 py-2 bg-yellow-400 text-black rounded-md hover:bg-yellow-500 transition">List Your Resources</a>
      </div>

      {/* Mobile Menu Button */}
      <button onClick={toggleMenu} className="lg:hidden border-none text-white focus:outline-none">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}></path>
        </svg>
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="absolute top-20 left-0 w-full bg-blue-800 shadow-lg p-4 flex flex-col space-y-4 lg:hidden z-20">
          <a href="#features" className="text-white hover:text-yellow-300 transition">Features</a>
          <a href="#about" className="text-white hover:text-yellow-300 transition">About Us</a>
          <a href="#pricing" className="text-white hover:text-yellow-300 transition">Pricing</a>
          <a href="/login" className="px-4 py-2 text-blue-600 bg-white border border-white rounded-md">Log In</a>
          <a href="/register" className="px-4 py-2 bg-yellow-400 text-black rounded-md hover:bg-yellow-500 transition">List Your Resources</a>
        </nav>
      )}
    </header>
  );
};

export default Header;
