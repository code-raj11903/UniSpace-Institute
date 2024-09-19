import React, { useState } from 'react';
import OrderHistory from './OrderHistory';

const InstituteProfile = () => {
  const [instituteInfo, setInstituteInfo] = useState({
    contact: '987654321',
    password: 'instpassword456',
    orders: [
      { id: 1, item: 'Whiteboard', status: 'Delivered' },
      { id: 2, item: 'Lab Equipment', status: 'Shipped' }
    ]
  });

  const handleChange = (e) => {
    setInstituteInfo({ ...instituteInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Institute info updated successfully!');
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-xl font-bold mb-4">Institute Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Contact Info</label>
          <input
            name="contact"
            value={instituteInfo.contact}
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
            value={instituteInfo.password}
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
          Update Institute Info
        </button>
      </form>

      <OrderHistory orders={instituteInfo.orders} />
    </div>
  );
};

export default InstituteProfile;
