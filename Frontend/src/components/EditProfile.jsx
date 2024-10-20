import React, { useContext, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const EditProfile = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    location: user?.location || '',
    phone: user?.phone || '',
    email: user?.email || '', // Email is fetched but won't be editable
    currentPassword: '',
    newPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/v1/${user.role}/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
    
      const data = await response.json();
      console.log(data);
      localStorage.setItem('user', JSON.stringify(data)); // Store user info
      localStorage.setItem('usertype', data.role); // Store user role (institute/department)
      setLoading(false);
      if (response.ok) {
        toast.success('Profile updated successfully!');
      } else {
        toast.error(`Error: ${data.error}`);
      }
    } catch (error) {
      setLoading(false);
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
          type="email"
          name="email"
          value={formData.email}
          placeholder="Email"
          className="border p-2 bg-gray-200 rounded w-full"
          disabled
        />
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="border bg-white p-2 rounded w-full"
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="border bg-white p-2 rounded w-full"
        />
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="border p-2 bg-white rounded w-full"
        />
       <div className="mb-6 relative">
        <input
          type= {showPassword ? "text":"password"}
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          placeholder="Current Password"
          className="border p-2 bg-white rounded w-full"
        />
         <button 
            type="button" 
            onClick={() => setShowNewPassword(!showNewPassword)} // Toggle password visibility
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white border-none focus:outline-none"
            >
            {showNewPassword ? <FaEyeSlash /> : <FaEye />} {/* Switch between eye and eye-slash icons */}
            </button>
      </div>
       <div className="mb-6 relative">
        <input
        type="password"
        name="newPassword"
        value={formData.newPassword}
        onChange={handleChange}
        placeholder="New Password"
        className="border p-2 bg-white rounded w-full"
        />
         <button 
            type="button" 
            onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white border-none focus:outline-none"
            >
            {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Switch between eye and eye-slash icons */}
            </button>
      </div>

        <div className="flex space-x-4">
          {/* Cancel Button */}
          <button
            type="button"
            onClick={handleCancel}
            className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition duration-300"
          >
            Cancel
          </button>

          <button
            type="submit"
            className={`w-full text-white py-2 rounded-lg transition duration-300 ${loading ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'}`}
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Save'}
          </button>
        </div>
      </form>

      {/* Toast Container for displaying toasts */}
      <ToastContainer />
    </div>
  );
};

export default EditProfile;
