// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { loginInstitute, loginDepartment } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import Register_img from "../assets/Name-Logo.png"
import { FaEye, FaEyeSlash } from 'react-icons/fa';
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginType, setLoginType] = useState('institute'); 
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response;
    try {
      if (loginType === 'institute') {
        response = await loginInstitute({ email, password });
      } else {
         response =  await loginDepartment({ email, password });
      }
       
      console.log(response);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
      <div
      className='flex  justify-center  h-screen mr-40'><img src={Register_img} alt="Register"/></div>

       <div className="bg-white shadow-lg p-8 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Log in to your account</h2>

        <div className="flex justify-around mb-6">
          <button className="bg-red-500 text-white py-2 px-4 rounded">
            Log in with Google
          </button>
        </div>

        <p className="text-center text-gray-500 mb-4">or</p>

        <form onSubmit={handleSubmit}>
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
          <div className="mb-6 relative">
            <input
              type= {showPassword ? "text":"password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg bg-white text-black"
              placeholder="Password"
              required
            />
             <button 
  type="button" 
  onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
  className="absolute right-3 top-4 text-sm bg-white text-black focus:outline-none"
>
  {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Switch between eye and eye-slash icons */}
</button>
          </div>

          <div className="mb-4 flex justify-center">
            <button
              type="button"
              className={`mr-2 p-2 border rounded ${loginType === 'institute' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              onClick={() => setLoginType('institute')}
            >
              Institute Login
            </button>
            <button
              type="button"
              className={`ml-2 p-2 border rounded ${loginType === 'department' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              onClick={() => setLoginType('department')}
            >
              Department Login
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition duration-300"
          >
            Log In
          </button>
        </form>

        <p className="text-center text-gray-500 mt-4">
          Forgot Password? <a href="/forgot-password" className="text-blue-600">Click Here</a>
        </p>

        <p className="text-center text-gray-500 mt-4">
          Don't have an account? <a href="/register" className="text-blue-600">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
