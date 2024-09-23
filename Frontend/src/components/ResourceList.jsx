import React, { useState, useEffect } from 'react';

const ResourceList = () => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    // Add some dummy data or fetch it from an API
    const dummyResources = [
      { id: 1, name: "Projector", type: "Equipment", status: "Available" },
      { id: 2, name: "Lab Computer", type: "Hardware", status: "In Use" },
      { id: 3, name: "Meeting Room", type: "Facility", status: "Available" },
    ];
    setResources(dummyResources);
  }, []);

  return (
    <div className="resource-list">
      <h2 className="text-2xl font-bold mb-4">Resource List</h2>
      {resources.length > 0 ? (
        <ul>
          {resources.map(resource => (
            <li key={resource.id} className="mb-2 p-4 border rounded-lg">
              <strong>Name:</strong> {resource.name} <br />
              <strong>Type:</strong> {resource.type} <br />
              <strong>Status:</strong> {resource.status}
            </li>
          ))}
        </ul>
      ) : (
        <p>No resources available</p>
      )}
    </div>
  );
};

export default ResourceList;
