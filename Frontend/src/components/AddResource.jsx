import React, { useState, useEffect } from 'react';

const AddResource = ({ addResource, editResource, handleUpdate }) => {
  const [resource, setResource] = useState({ name: '', department: '', type: '' });

  useEffect(() => {
    if (editResource) {
      setResource(editResource);
    } else {
      setResource({ name: '', department: '', type: '' });
    }
  }, [editResource]);

  const handleChange = (e) => {
    setResource({ ...resource, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editResource) {
      handleUpdate(resource);
    } else {
      addResource(resource);
    }
    setResource({ name: '', department: '', type: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="my-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Resource Name</label>
        <input
          type="text"
          name="name"
          value={resource.name}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Department</label>
        <input
          type="text"
          name="department"
          value={resource.department}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Type</label>
        <input
          type="text"
          name="type"
          value={resource.type}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        {editResource ? 'Update Resource' : 'Add Resource'}
      </button>
    </form>
  );
};

export default AddResource;
