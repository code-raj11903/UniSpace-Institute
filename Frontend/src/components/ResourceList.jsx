import React from 'react';

const ResourceList = ({ resources, deleteResource, handleEdit }) => {
  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold">Resource List</h3>
      <ul>
        {resources.map((resource) => (
          <li key={resource.id} className="my-2 p-2 border border-gray-300">
            <p><strong>Name:</strong> {resource.name}</p>
            <p><strong>Department:</strong> {resource.department}</p>
            <p><strong>Type:</strong> {resource.type}</p>
            <button
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 mr-2 rounded"
              onClick={() => handleEdit(resource)}>
              Edit
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
              onClick={() => deleteResource(resource.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResourceList;
