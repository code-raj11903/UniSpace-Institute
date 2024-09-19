import React from 'react';

const DepartmentList = ({ departments, deleteDepartment }) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Department List</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Name</th>
            <th className="py-2">Email</th>
            <th className="py-2">Location</th>
            <th className="py-2">Contact</th>
            <th className="py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {departments.map(department => (
            <tr key={department.id}>
              <td className="py-2 px-4 border">{department.name}</td>
              <td className="py-2 px-4 border">{department.email}</td>
              <td className="py-2 px-4 border">{department.location}</td>
              <td className="py-2 px-4 border">{department.contact}</td>
              <td className="py-2 px-4 border">
                <button
                  onClick={() => deleteDepartment(department.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentList;
