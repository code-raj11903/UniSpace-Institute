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
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-xl font-bold mb-4">Add New Department</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Department Name</label>
        <input
          name="name"
          value={department.name}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          type="text"
          placeholder="Department Name"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
        <input
          name="email"
          value={department.email}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          type="email"
          placeholder="Department Email"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Location</label>
        <input
          name="location"
          value={department.location}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          type="text"
          placeholder="Location"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Contact Info</label>
        <input
          name="contact"
          value={department.contact}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          type="text"
          placeholder="Contact Info"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
        <input
          name="password"
          value={department.password}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          type="password"
          placeholder="Password"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Department
      </button>
    </form>
  );
};

export default AddDepartment;
