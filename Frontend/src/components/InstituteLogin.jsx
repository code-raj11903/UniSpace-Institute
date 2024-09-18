import React, { useState } from 'react';

function LoginForm({ switchToRegister }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login form submitted:', formData);
  };

  return (
    <div className="max-w-md mx-auto p-8 border border-gray-200 rounded-lg bg-white shadow-lg mt-9">
      <h2 className="text-2xl font-bold mb-6 text-center">Institute Login</h2>
      <form onSubmit={handleSubmit}>
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
          Sign In
        </button>
        <div className="mt-4">
          <a href="#" className="block text-gray-500 text-sm hover:underline">
            Forgot password?
          </a>
          <a
            href="#"
            className="block text-gray-500 text-sm hover:underline"
            onClick={switchToRegister} // Switch to register form
          >
            Create Account?
          </a>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
