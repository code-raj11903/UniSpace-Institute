import React from 'react';

const DepartmentList = ({ departments }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold">Department List</h2>
      {departments.length > 0 ? (
        <table className="table-auto w-full mt-4 bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Contact</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dept) => (
              <tr key={dept.id}>
                <td className="border px-4 py-2">{dept.id}</td>
                <td className="border px-4 py-2">{dept.name}</td>
                <td className="border px-4 py-2">{dept.email}</td>
                <td className="border px-4 py-2">{dept.location}</td>
                <td className="border px-4 py-2">{dept.contact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No departments available</p>
      )}
    </div>
  );
};

export default DepartmentList;
