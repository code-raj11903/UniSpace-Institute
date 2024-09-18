import React, { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-indigo-900 text-white shadow-lg p-4 lg:p-6 mt-2 mx-auto rounded-xl max-w-screen-xl backdrop-blur-lg backdrop-saturate-150 transition-all duration-300">
      <div className="flex justify-between items-center">
        {/* Brand / Logo */}
        <a href="#" className="text-xl font-bold tracking-wide hover:text-yellow-300 transition duration-300">
          uniSpace
        </a>

        {/* Hamburger Button for Small Screens */}
        <button className="lg:hidden p-2 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300 transition duration-300" onClick={toggleMenu}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>

        {/* Menu Links (visible on large screens) */}
        <ul className="hidden lg:flex gap-8">
          <li className="text-sm font-medium">
            <a href="#" className="hover:text-yellow-300 transition duration-300">About Us</a>
          </li>
          <li className="text-sm font-medium">
            <a href="#" className="hover:text-yellow-300 transition duration-300">Contact Us</a>
          </li>
        </ul>
      </div>

      {/* Mobile Menu (visible only on small screens when toggled) */}
      {isMenuOpen && (
        <div className="lg:hidden mt-4 transition duration-300">
          <ul className="flex flex-col gap-4 bg-gray-100 p-4 rounded-lg shadow-md">
            <li className="text-sm font-medium">
              <a href="#" className="text-gray-900 hover:bg-indigo-500 hover:text-white transition-colors duration-300 p-2 rounded-md">
                About Us
              </a>
            </li>
            <li className="text-sm font-medium">
              <a href="#" className="text-gray-900 hover:bg-indigo-500 hover:text-white transition-colors duration-300 p-2 rounded-md">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
