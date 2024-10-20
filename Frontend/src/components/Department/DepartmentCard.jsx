import React from 'react';

const DepartmentCard = ({ department, onDelete }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg p-4">
      <h3 className="text-xl font-bold">{department.name}</h3>
      <p>Email: {department.email}</p>
      <p>Location: {department.location}</p>
      <p>Phone: {department.phone}</p>
      <div className="mt-4">
        <button
          onClick={onDelete}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DepartmentCard;
