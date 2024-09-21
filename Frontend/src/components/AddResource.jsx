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
      <h1 className="text-2xl font-bold mb-4 text-black">Add Resource</h1> {/* Changed to black */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="resourceName" className="block text-black">Resource Name</label> {/* Changed to black */}
          <input 
            id="resourceName" 
            type="text" 
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black-500" 
            required 
          />
        </div>
        <div className="mb-4">
          <label htmlFor="department" className="block text-black">Department</label> {/* Changed to black */}
          <input 
            id="department" 
            type="text" 
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black-500" 
            required 
          />
        </div>
        <div className="mb-4">
          <label htmlFor="type" className="block text-black">Type</label> {/* Changed to black */}
          <input 
            id="type" 
            type="text" 
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black-500" 
            required 
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-black text-white py-2 rounded-md hover:bg-black-600 focus:outline-none"
        >
          Add Resource {/* Button text remains white */}
        </button>
      </form>
    </div>
  );
};

export default AddResource;
