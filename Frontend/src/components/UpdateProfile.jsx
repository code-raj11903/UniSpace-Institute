import React from 'react';

const ResourceList = ({ resources }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold">Resource List</h2>
      {resources.length > 0 ? (
        <table className="table-auto w-full mt-4">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Department</th>
              <th className="px-4 py-2">Type</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((resource) => (
              <tr key={resource.id}>
                <td className="border px-4 py-2">{resource.id}</td>
                <td className="border px-4 py-2">{resource.name}</td>
                <td className="border px-4 py-2">{resource.department}</td>
                <td className="border px-4 py-2">{resource.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No resources available</p>
      )}
    </div>
  );
};

export default ResourceList;
