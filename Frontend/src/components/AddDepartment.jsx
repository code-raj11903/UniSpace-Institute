import React, { useState } from 'react';

const AddDepartment = ({ addDepartment }) => {
  const [department, setDepartment] = useState({
    name: '',
    email: '',
    location: '',
    contact: '',
    password: ''
  });

  const handleChange = (e) => {
    setDepartment({ ...department, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!department.name || !department.email || !department.contact) {
      alert('Please fill all required fields');
      return;
    }
    addDepartment(department);
    setDepartment({ name: '', email: '', location: '', contact: '', password: '' });
  };

  return (
    <div className="flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-10 pt-8 pb-5 mb-4 max-w-2xl w-full"> {/* Increased size */}
        <h2 className="text-3xl font-bold mb-8 text-center">Add New Department</h2> {/* Increased font size */}
        
        <div className="mb-6">
          <label className="block text-gray-700 text-base font-bold mb-2">Department Name</label> {/* Increased font size */}
          <input
            name="name"
            value={department.name}
            onChange={handleChange}
            className="shadow appearance-none border border-gray-400 rounded w-full py-4 px-4 text-gray-700 leading-tight focus:outline-none focus:border-black"
            type="text"
            placeholder="Enter department name"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-base font-bold mb-2">Email</label> {/* Increased font size */}
          <input
            name="email"
            value={department.email}
            onChange={handleChange}
            className="shadow appearance-none border border-gray-400 rounded w-full py-4 px-4 text-gray-700 leading-tight focus:outline-none focus:border-black"
            type="email"
            placeholder="Enter department email"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-base font-bold mb-2">Location</label> {/* Increased font size */}
          <input
            name="location"
            value={department.location}
            onChange={handleChange}
            className="shadow appearance-none border border-gray-400 rounded w-full py-4 px-4 text-gray-700 leading-tight focus:outline-none focus:border-black"
            type="text"
            placeholder="Enter location"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-base font-bold mb-2">Contact Info</label> {/* Increased font size */}
          <input
            name="contact"
            value={department.contact}
            onChange={handleChange}
            className="shadow appearance-none border border-gray-400 rounded w-full py-4 px-4 text-gray-700 leading-tight focus:outline-none focus:border-black"
            type="text"
            placeholder="Enter contact info"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-base font-bold mb-2">Password</label> {/* Increased font size */}
          <input
            name="password"
            value={department.password}
            onChange={handleChange}
            className="shadow appearance-none border border-gray-400 rounded w-full py-4 px-4 text-gray-700 leading-tight focus:outline-none focus:border-black"
            type="password"
            placeholder="Enter password"
          />
        </div>

        <button
          type="submit"
          className="bg-black hover:bg-blue-700 text-white font-bold py-4 px-4 rounded w-full focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
        >
          Add Department
        </button>
      </form>
    </div>
  );
};

export default AddDepartment;
