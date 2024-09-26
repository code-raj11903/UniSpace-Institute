import React from 'react';
import { Link } from 'react-router-dom';

const RegisterPopup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Register as an Institute</h2>
        <p className="mb-4">Join UniSpace to manage your resources and bookings efficiently.</p>
        <Link
          to="/register"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md"
          onClick={onClose}
        >
          Register Now
        </Link>
        <button
          className="mt-4 text-gray-600 underline"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default RegisterPopup;
