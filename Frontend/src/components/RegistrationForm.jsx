import React, { useState } from 'react';

function RegistrationForm({ switchToLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    location: '',
    phone: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registration form submitted:', formData);
  };

  return (
    <div className="max-w-md mx-auto p-8 border border-gray-200 rounded-lg bg-white shadow-lg mt-9">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Name"
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Email"
          />
        </div>
        <div>
          <label>Address</label>
          <input
            type="textarea"
            name="address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Address"
          />
        </div>
        <div>
          <label>Contact No.</label>
          <input
            type="number"
            name="phone_number"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Contact No."
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Password"
          />
        </div>
        <button type="submit" className="w-full py-2 mt-4 bg-blue-600 text-white rounded-lg">
          Register
        </button>
        <div className="mt-4">
          <a
            href="#"
            className="block text-gray-500 text-sm hover:underline"
            onClick={switchToLogin} 
          >
            Already have an account? Sign In
          </a>
        </div>
      </form>
    </div>
  );
}

export default RegistrationForm;
