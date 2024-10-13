import React, { useContext, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye } from 'react-icons/fa';

const EditProfile = () => {
  const {user} = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    location: user?.location || '',
    phone: user?.phone || '',
    currentPassword: '',
    newPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/v1/${user.role}/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success('Profile updated successfully!');
      } else {
        toast.error(`Error: ${data.error}`);
      }
    } catch (error) {
      toast.error('Error updating profile.');
      console.error('Error updating profile:', error);
    }
  };
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate('/dashboard'); // Redirect to dashboard or any other route
  };

  return (
    <div className="p-4 bg-white rounded shadow-lg max-w-xl mx-auto sm:px-6 lg:px-8 mt-6">
      <h2 className="text-lg font-bold mb-4 text-center">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="border  bg-white p-2 rounded w-full"
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="border  bg-white p-2 rounded w-full"
        />
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="border p-2  bg-white  rounded w-full"
        />
        <input
          type="password"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          placeholder="Current Password"
          className="border  bg-white p-2 rounded w-full"
        />
        <input
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          placeholder="New Password"
          className="border bg-white  p-2 rounded w-full"
        />

        <div className="flex space-x-4">
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">
            Save 
          </button>
          
          {/* Cancel Button */}
          <button
            type="button"
            onClick={handleCancel}
            className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition duration-300"
          >
            Cancel
          </button>
        </div>
      </form>

      {/* Toast Container for displaying toasts */}
      <ToastContainer />
    </div>
  );
};

export default EditProfile;