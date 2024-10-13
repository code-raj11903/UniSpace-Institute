import React from 'react';

const ResourceCard = ({ resource, onEdit, onDelete }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg">
      <img src={resource.imageUrl} alt={resource.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-bold">{resource.name}</h3>
        <p>Location: {resource.location}</p>
        <p>Price: ${resource.price}</p>
        <div className="mt-4 flex justify-between">
          <button onClick={onEdit} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
            Edit
          </button>
          <button onClick={onDelete} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
