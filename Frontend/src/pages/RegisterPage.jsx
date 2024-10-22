import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Register_img from "../assets/Name-Logo.png";
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const { setUser } = useContext(AuthContext); // Get setUser from context
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/v1/institute/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, location, phone }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      const data = await response.json();
      // localStorage.setItem('token', data.token); // Store token in localStorage
      // localStorage.setItem('user', JSON.stringify(data.user)); // Store user info
      // localStorage.setItem('usertype', data.user.role); // Store user role

      // setUser(data.user); // Set user in global context after successful registration
      console.log(data);

      toast.success('Registered successful!');
      navigate('/login'); // Redirect to dashboard after successful registration
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
        <img src={Register_img} alt="Register"className="max-w-full h-full object-contain" />
      </div>

      {/* Right Form Section */}
      <div className="bg-white shadow-lg p-8 rounded-lg w-full md:max-w-lg lg:mr-20 ">
        <h2 className="text-2xl font-bold mb-4 text-center">Create an Institute Account</h2>

        <form onSubmit={handleRegister}>
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
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white border-none focus:outline-none"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
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
              'Sign Up'
            )}
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
