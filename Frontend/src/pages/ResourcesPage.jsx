import React, { useEffect, useState } from 'react';
import ResourceCard from '../components/Resource/ResourceCard';
import AddEditResourceModal from '../components/Resource/AddEditResourceModal';

const ResourcesPage = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editResource, setEditResource] = useState(null);

  useEffect(() => {
    fetchResources();
  }, [currentPage, searchQuery]);

  const fetchResources = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/resources?page=${currentPage}&search=${searchQuery}`);
      const data = await res.json();
      setResources(data.resources);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching resources:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteResource = async (resourceId) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      try {
        await fetch(`/api/resources/${resourceId}`, { method: 'DELETE' });
        fetchResources(); // Refresh the list
      } catch (error) {
        console.error('Error deleting resource:', error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Search and Add Button */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          className="w-1/2 p-2 border border-gray-300 rounded"
          placeholder="Search resources..."
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
          {resources.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              onEdit={() => {
                setEditResource(resource);
                setShowModal(true);
              }}
              onDelete={() => handleDeleteResource(resource.id)}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`mx-1 px-3 py-2 border ${
              currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'
            } rounded`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>

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
    </div>
  );
};

export default ResourcesPage;
