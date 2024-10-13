import React, { useState } from 'react';

const AddEditResourceModal = ({ isOpen, onClose, resource, onSuccess }) => {
  const [form, setForm] = useState({
    name: resource?.name || '',
    location: resource?.location || '',
    price: resource?.price || '',
    imageUrl: resource?.imageUrl || '',
  });

  const handleSubmit = async () => {
    const method = resource ? 'PUT' : 'POST';
    const url = resource ? `/api/resources/${resource.id}` : '/api/resources';

    try {
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error saving resource:', error);
    }
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? '' : 'hidden'}`}>
      <div className="bg-white p-6 rounded shadow-lg w-1/2">
        <h2 className="text-2xl mb-4">{resource ? 'Edit Resource' : 'Add Resource'}</h2>
        <div className="mb-4">
          <label className="block mb-2">Resource Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Location</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Price</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Image URL</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
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

export default AddEditResourceModal;
