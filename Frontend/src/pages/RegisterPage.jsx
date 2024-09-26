// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { registerInstitute } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Register_img from "../assets/Name-Logo.png"

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const instituteData = {
      name,
      email,
      password,
      location,
      phone
    };

    try {
      const response = await registerInstitute(instituteData);
      console.log(response)
      // navigate('/dashboard');  
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  bg-gray-100">
      <div
      className='flex  justify-center  h-screen mr-40'><img src={Register_img} alt="Register"/></div>
      
      <div className="bg-white shadow-lg p-8 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Create an Institute Account</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-lg bg-white text-black"
              placeholder="Institute Name"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg bg-white text-black"
              placeholder="E-mail"
              required
            />
          </div>
          <div className="mb-4 relative">
          
          <input 
            type={showPassword ? 'text' : 'password'} // Toggle between password and text input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg mt-2 bg-white text-black" 
            placeholder="Password"
            required
          />
          <button 
  type="button" 
  onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
  className="absolute right-3 top-2 text-sm bg-white text-black focus:outline-none"
>
  {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Switch between eye and eye-slash icons */}
</button>
        </div>

          <div className="mb-4">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-3 border rounded-lg bg-white text-black"
              placeholder="Location"
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 border rounded-lg bg-white text-black"
              placeholder="Phone Number"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-500 mt-4">
          Already have an account? <a href="/login" className="text-blue-600">Log In</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
