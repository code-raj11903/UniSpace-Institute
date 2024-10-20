import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* About Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">About UniSpace</h3>
          <p className="text-gray-400">
            UniSpace is a platform designed to efficiently manage the resources, departments, and bookings of educational institutions. Our goal is to simplify asset management for colleges and schools.
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">Useful Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="text-gray-400 hover:text-white">Home</a></li>
            <li><a href="/departments" className="text-gray-400 hover:text-white">Departments</a></li>
            <li><a href="/resources" className="text-gray-400 hover:text-white">Resources</a></li>
            <li><a href="/orders" className="text-gray-400 hover:text-white">Order History</a></li>
            <li><a href="/profile" className="text-gray-400 hover:text-white">Profile</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">Contact Us</h3>
          <p className="text-gray-400">
            123 UniSpace Blvd, Suite 400<br />
            Education City, ED 90210
          </p>
          <p className="text-gray-400 mt-2">
            Email: <a href="mailto:contact@unispace.com" className="text-gray-400 hover:text-white">contact@unispace.com</a><br />
            Phone: +1 800 123 4567
          </p>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.897V12H10.44V9.797c0-2.511 1.492-3.89 3.776-3.89 1.096 0 2.242.195 2.242.195v2.47h-1.262c-1.243 0-1.632.771-1.632 1.562V12h2.781l-.444 2.891h-2.337v6.987C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557a9.98 9.98 0 01-2.827.775 4.941 4.941 0 002.165-2.724 9.864 9.864 0 01-3.127 1.194 4.92 4.92 0 00-8.384 4.482c-4.086-.205-7.719-2.164-10.148-5.142A4.822 4.822 0 00.92 7.302a4.92 4.92 0 002.188.612A4.916 4.916 0 01.965 5.3v.063a4.928 4.928 0 003.946 4.827 4.898 4.898 0 01-2.213.084 4.923 4.923 0 004.602 3.419A9.87 9.87 0 010 19.54 13.94 13.94 0 007.548 21c9.142 0 14.307-7.721 14.307-14.418 0-.22-.005-.437-.014-.653A10.243 10.243 0 0024 4.557z" />
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.896 3H4.102A1.105 1.105 0 003 4.111V19.89A1.105 1.105 0 004.102 21H19.89a1.105 1.105 0 001.109-1.11V4.111A1.105 1.105 0 0019.896 3zm-10.61 14.348H5.89v-7.826h3.396v7.826zm-1.696-8.939a1.972 1.972 0 110-3.945 1.972 1.972 0 010 3.945zm10.909 8.939h-3.39v-3.991c0-.952-.017-2.178-1.327-2.178-1.329 0-1.533 1.038-1.533 2.11v4.059H9.835v-7.826h3.255v1.07h.046a3.568 3.568 0 013.211-1.766c3.432 0 4.066 2.261 4.066 5.203v3.319z" />
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.33 3.608 1.305.975.975 1.243 2.243 1.305 3.608.059 1.265.07 1.645.07 4.849 0 3.204-.012 3.584-.07 4.849-.062 1.366-.33 2.633-1.305 3.608-.975.975-2.243 1.243-3.608 1.305-1.265.059-1.645.07-4.849.07-3.204 0-3.584-.012-4.849-.07-1.366-.062-2.633-.33-3.608-1.305-.975-.975-1.243-2.243-1.305-3.608C2.175 15.584 2.163 15.204 2.163 12c0-3.204.012-3.584.07-4.849.062-1.366.33-2.633 1.305-3.608C4.513 2.493 5.781 2.225 7.146 2.163c1.265-.059 1.645-.07 4.849-.07zm0-2.163C8.766 0 8.325.012 7.05.072c-1.555.073-2.957.366-4.092 1.502C1.893 2.606 1.6 4.008 1.528 5.563.966 7.845.954 8.275.954 12c0 3.725.012 4.155.072 6.438.073 1.555.366 2.957 1.502 4.092 1.136 1.136 2.538 1.43 4.092 1.502 1.283.06 1.724.072 5.448.072 3.725 0 4.155-.012 6.438-.072 1.555-.073 2.957-.366 4.092-1.502 1.136-1.136 1.43-2.538 1.502-4.092.06-1.283.072-1.724.072-5.448 0-3.725-.012-4.155-.072-6.438-.073-1.555-.366-2.957-1.502-4.092C19.507 1.439 18.105 1.146 16.55 1.072 15.275.012 14.834 0 12 0zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.838 3.838 0 110-7.676 3.838 3.838 0 010 7.676zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      {/* Bottom Section */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500">
        <p>© {new Date().getFullYear()} UniSpace. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
