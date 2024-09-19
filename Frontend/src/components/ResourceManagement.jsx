import React, { useState } from 'react';
import AddResource from './AddResource';
import ResourceList from './ResourceList';

const ResourceManagement = ({ resources, addResource, updateResource, deleteResource }) => {
  const [editResource, setEditResource] = useState(null);

  const handleEdit = (resource) => {
    setEditResource(resource);
  };

  const handleUpdate = (resource) => {
    updateResource(resource);
    setEditResource(null);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Resource Management</h2>
      <AddResource
        addResource={addResource}
        editResource={editResource}
        handleUpdate={handleUpdate}
      />
      <ResourceList
        resources={resources}
        deleteResource={deleteResource}
        handleEdit={handleEdit}
      />
    </div>
  );
};

export default ResourceManagement;
