import React, { useState } from 'react';
import { FaRupeeSign } from 'react-icons/fa';
import Switcher from './switcher';
  // Import the toggle switch component

const ResourceCard = ({ resource, onEdit, onDelete, onToggleAvailability }) => {
  const [isAvailable, setAvailability] = useState(resource.availability);

  const handleToggle = async () => {
    const newAvailability = !isAvailable;
    setAvailability(newAvailability);
    onToggleAvailability(resource._id, newAvailability); // Pass the new state to the parent
  };

  return (
    <div className="relative border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
      {/* Image Section */}
      <img
        src={resource.image_url}
        alt={resource.name}
        className="w-full h-52 object-cover"
      />

      {/* Resource Info Section */}
      <div className="p-4">
        {/* Name and Toggle aligned horizontally */}
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-800">{resource.name}</h3>
          <Switcher6 isChecked={isAvailable} handleCheckboxChange={handleToggle} />
        </div>
        
        <p className="text-gray-600 mt-2">
          <strong>Location:</strong> {resource.location}
        </p>
        <p className="text-gray-600 mt-2 flex items-center">
          <FaRupeeSign className="mr-1" /> 
          <span className="text-lg">{resource.price_per_day}</span>
          <span className="ml-1 text-sm text-gray-500">/ day</span>
        </p>

        <div className="mt-6 flex justify-between">
          <button
            onClick={onEdit}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
