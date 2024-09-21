import React, { useState } from 'react';

const InstituteProfileForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    location: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});

  // Basic validation functions
  const isEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isPhoneNumber = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = 'Institute name is required';
    if (!formData.email || !isEmail(formData.email))
      tempErrors.email = 'A valid email is required';
    if (!formData.currentPassword)
      tempErrors.currentPassword = 'Current password is required';
    if (
      !formData.newPassword ||
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,32}$/.test(
        formData.newPassword
      )
    )
      tempErrors.newPassword =
        'New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character!';
    if (!formData.location) tempErrors.location = 'Location is required';
    if (!formData.phone || !isPhoneNumber(formData.phone))
      tempErrors.phone = 'A valid phone number is required';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission (e.g., API call or static data update)
      console.log('Form submitted with:', formData);
    }
  };

  return (
    <div className="flex justify-center items-center ">
      <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-black mb-6">
          Update Institute Profile
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label
              className="block text-black font-semibold mb-2"
              htmlFor="name"
            >
              Institute Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && <p className="text-red-500 mt-2">{errors.name}</p>}
          </div>

          {/* Current Password */}
          <div className="mb-4">
            <label
              className="block text-black font-semibold mb-2"
              htmlFor="currentPassword"
            >
              Current Password
            </label>
            <input
              type="password"
              name="currentPassword"
              id="currentPassword"
              value={formData.currentPassword}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.currentPassword && (
              <p className="text-red-500 mt-2">{errors.currentPassword}</p>
            )}
          </div>

          {/* New Password */}
          <div className="mb-4">
            <label
              className="block text-black font-semibold mb-2"
              htmlFor="newPassword"
            >
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.newPassword && (
              <p className="text-red-500 mt-2">{errors.newPassword}</p>
            )}
          </div>

          {/* Location */}
          <div className="mb-4">
            <label
              className="block text-black font-semibold mb-2"
              htmlFor="location"
            >
              Location
            </label>
            <input
              type="text"
              name="location"
              id="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.location && (
              <p className="text-red-500 mt-2">{errors.location}</p>
            )}
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label
              className="block text-black font-semibold mb-2"
              htmlFor="phone"
            >
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.phone && (
              <p className="text-red-500 mt-2">{errors.phone}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default InstituteProfileForm;
