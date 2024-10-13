import React, { useState } from 'react';

const AddEditDepartmentModal = ({ isOpen, onClose, onSuccess }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    location: '',
    contact: '',
    password: ''
  });

  const handleSubmit = async () => {
    try {
      const res = await fetch('/api/department/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        onSuccess(); // Fetch departments after successful addition
        onClose();
      }
    } catch (error) {
      console.error('Error adding department:', error);
    }
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? '' : 'hidden'}`}>
      <div className="bg-white p-6 rounded shadow-lg w-1/2">
        <h2 className="text-2xl mb-4">Add Department</h2>
        <div className="mb-4">
          <label className="block mb-2">Department Name</label>
          <input
            type="text"
            className="w-full p-2 border bg-white border-gray-300 rounded"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            className="w-full p-2 border bg-white border-gray-300 rounded"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Location</label>
          <input
            type="text"
            className="w-full p-2 border bg-white border-gray-300 rounded"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Location</label>
          <input
            type="text"
            className="w-full p-2 border bg-white border-gray-300 rounded"
            value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Location</label>
          <input
            type="text"
            className="w-full p-2 border bg-white border-gray-300 rounded"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>
        <div className="flex justify-end">
          <button className="bg-gray-500 text-white px-4 py-2 rounded mr-2" onClick={onClose}>
            Cancel
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEditDepartmentModal;
