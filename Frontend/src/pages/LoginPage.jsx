import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import Register_img from "../assets/Name-Logo.png";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginType, setLoginType] = useState('institute');
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`/api/v1/${loginType}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Login failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token); // Store token in localStorage
      localStorage.setItem('user', JSON.stringify(data.user)); // Store user info
      localStorage.setItem('usertype', data.user.role); // Store user role (institute/department)

      setUser(data.user); // Set user in context
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message);
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-between bg-gray-100 p-2 ">
      {/* Left Image Section - Hidden on screens smaller than lg (1024px) */}
      <div className="hidden lg:flex lg:w-1/2 justify-center items-center h-full">
        <img src={Register_img} alt="Register" className="max-w-full h-full object-contain" />
      </div>

      {/* Right Form Section */}
      <div className="bg-white shadow-lg p-8 rounded-lg w-full md:max-w-lg lg:mr-20">
        <h2 className="text-2xl font-bold mb-4 text-center">Log in to your account</h2>

        {/* <div className="flex justify-around mb-6">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
            Log in with Google
          </button>
        </div> */}

        {/* <p className="text-center text-gray-500 mb-4">or</p> */}

        <form onSubmit={handleLogin}>
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
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg bg-white text-black"
              placeholder="Password"
              required
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)} 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white border-none focus:outline-none"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="mb-4 flex justify-center space-x-4">
            <button
              type="button"
              className={`p-2 border rounded-lg ${loginType === 'institute' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
              onClick={() => setLoginType('institute')}
            >
              Institute Login
            </button>
            <button
              type="button"
              className={`p-2 border rounded-lg ${loginType === 'department' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
              onClick={() => setLoginType('department')}
            >
              Department Login
            </button>
          </div>

          <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg flex justify-center items-center"
              disabled={loading}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
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
                'Log In'
              )}
            </button>

        </form>

        {/* <p className="text-center text-gray-500 mt-4">
          Forgot Password? <a href="/forgot-password" className="text-blue-600">Click Here</a>
        </p> */}

        <p className="text-center text-gray-500 mt-4">
          Don't have an account? <a href="/register" className="text-blue-600">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
