import React from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPopup = ({ onClose }) => {
  const navigate = useNavigate(); // useNavigate hook for navigation

  const handleRegisterClick = () => {
    navigate('/register'); // Navigate to the /register route
    onClose(); // Optionally close the popup after navigation
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-xl"> {/* Increased max width to 'xl' */}
        <center><h2 className="text-2xl font-bold mb-4">Register as an Institute</h2></center>
        <p className="mb-4 text-center"> {/* Added 'text-center' for better alignment */}
          Manage your resources and bookings with UniSpace efficiently.
        </p>
        
        {/* Flex container for buttons */}
        <div className="flex justify-center space-x-4">
          {/* Register Now Button */}
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            onClick={handleRegisterClick}
          >
            Register Now
          </button>
          
          {/* Close Button */}
          <button
            className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
            onClick={onClose}
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default RegisterPopup;
