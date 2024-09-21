import React from 'react';

const AddResource = ({ addResource }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const resource = {
      name: e.target.resourceName.value,
      department: e.target.department.value,
      type: e.target.type.value,
    };
    addResource(resource);
    e.target.reset();
  };

  return (
    <div className="max-w-lg mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-black">Add Resource</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="resourceName" className="block text-black">Resource Name</label>
          <input
            id="resourceName"
            type="text"
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="department" className="block text-black">Department</label>
          <input
            id="department"
            type="text"
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="type" className="block text-black">Type</label>
          <input
            id="type"
            type="text"
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-black">Description</label>
          <textarea
            id="description"
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="pricePerDay" className="block text-black">Price per Day</label>
          <input
            id="pricePerDay"
            type="text"
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="resourceAddress" className="block text-black">Resource Address</label>
          <input
            id="resourceAddress"
            type="text"
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="uploadImage" className="block text-black">Upload Image</label>
          <input
            id="uploadImage"
            type="file"
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Add Resource
        </button>
      </form>
    </div>
  );
};

export default AddResource;
