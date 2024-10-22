import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const AddDepartmentModal = ({ isOpen, onClose, onSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async () => {
    setLoading(true); // Set loading to true when the request is made
    try {
      const res = await fetch('/api/v1/institute/department/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          location,
          phone,
          password,
        }),
      });
      if (res.ok) {
        toast.success('Department Added successfully!');
        onSuccess(); // Fetch departments after successful addition
        onClose();
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || 'Failed to add department');
      }
    } catch (error) {
      toast.error(error.message);
      console.error('Error adding department:', error);
    } finally {
      setLoading(false); // Set loading back to false when the request is complete
    }
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? '' : 'hidden'}`}>
      <div className="bg-white p-6 rounded shadow-lg w-1/2">
        <h2 className="text-2xl mb-4">Add Department</h2>
        <div className="mb-4">
          <input
            type="text"
            className="w-full p-2 border bg-white border-gray-300 rounded"
            value={name}
            placeholder="Department Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            className="w-full p-2 border bg-white border-gray-300 rounded"
            value={email}
            placeholder="example@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="location"
            className="w-full p-2 border bg-white border-gray-300 rounded"
            value={location}
            placeholder="Landmark"
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="phone"
            className="w-full p-2 border bg-white border-gray-300 rounded"
            value={phone}
            placeholder="eg: 9876543210"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="mb-6 relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg bg-white text-black"
            placeholder="Password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white border-none focus:outline-none"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Switch between eye and eye-slash icons */}
          </button>
        </div>
        <div className="flex justify-end">
          <button className="bg-gray-500 text-white px-4 py-2 rounded mr-2" onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
            onClick={handleSubmit}
            disabled={loading} // Disable button while loading
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
            ) : (
              'Save'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddDepartmentModal;
