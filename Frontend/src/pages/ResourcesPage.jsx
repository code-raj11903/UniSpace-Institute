import React, { useEffect, useContext, useState } from 'react';
import ResourceCard from '../components/Resource/ResourceCard';
import { toast } from 'react-toastify';
import AddEditResourceModal from '../components/Resource/AddEditResourceModal';
import ConfirmDeleteModal from '../components/Department/ConfirmDeleteModal';
import { AuthContext } from '../context/AuthContext';

const ResourcesPage = () => {
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editResource, setEditResource] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [resourceToDelete, setResourceToDelete] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchResources();
  }, []);

  useEffect(() => {
    // Filter resources by name and location based on the search query
    const filtered = resources.filter(
      (resource) =>
        resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredResources(filtered);
  }, [searchQuery, resources]);

  const fetchResources = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/v1/${user.role}/resources`);
      const data = await res.json();
      setResources(data);
    } catch (error) {
      console.error('Error fetching resources:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAvailability = async (resourceId, newAvailability) => {
    try {
      await fetch(`/api/v1/${user.role}/resources/update/${resourceId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ availability: newAvailability }),
      });
      // Optimistically update the resource in the state without refetching
      setResources((prevResources) =>
        prevResources.map((resource) =>
          resource._id === resourceId ? { ...resource, availability: newAvailability } : resource
        )
      );
    } catch (error) {
      console.error('Error updating availability:', error);
    }
  };

  const handleDeleteResource = async () => {
    if (resourceToDelete) {
      try {
        await fetch(`/api/v1/${user.role}/resources/delete/${resourceToDelete}`, { method: 'DELETE' });
        setResources((prevResources) => prevResources.filter((r) => r._id !== resourceToDelete));
        setDeleteModalOpen(false); // Close modal after deletion
        toast.success('Deleted successful!');
      } catch (error) {
        toast.error(error.message);
        console.error('Error deleting resource:', error);
      }
    }
  };

  // Open delete confirmation modal
  const openDeleteModal = (resourceId) => {
    setResourceToDelete(resourceId);
    setDeleteModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Search and Add Button */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          className="w-1/2 p-2 border border-gray-300 rounded bg-white text-black"
          placeholder="Search resources by name or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Resource
        </button>
      </div>

      {/* Resource List */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="spinner border-t-4 border-blue-500 border-solid rounded-full w-16 h-16"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredResources.map((resource) => (
            <ResourceCard
              key={resource._id}
              resource={resource}
              onEdit={() => {
                setEditResource(resource);
                setShowModal(true);
              }}
              onDelete={() => openDeleteModal(resource._id)}
              onToggleAvailability={handleToggleAvailability} // Pass toggle handler
            />
          ))}
        </div>
      )}

      {/* Add/Edit Resource Modal */}
      {showModal && (
        <AddEditResourceModal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setEditResource(null);
          }}
          resource={editResource}
          onSuccess={fetchResources}
        />
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)} // Close modal on No
        onConfirm={handleDeleteResource} // Confirm delete
        item={"resource"}
      />
    </div>
  );
};

export default ResourcesPage;
