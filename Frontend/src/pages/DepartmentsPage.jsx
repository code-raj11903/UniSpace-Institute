import React, { useEffect, useContext, useState } from 'react';
import DepartmentCard from '../components/Department/DepartmentCard';
import AddDepartmentModal from '../components/Department/AddDepartmentModal';
import ConfirmDeleteModal from '../components/Department/ConfirmDeleteModal'; // Import the modal
import { toast } from 'react-toastify';

const DepartmentsPage = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState(null); // Store the department ID to delete

  useEffect(() => {
    fetchDepartments();
  }, []);

  // Fetch all departments
  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/v1/institute/departments`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await res.json();
      setDepartments(data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    } finally {
      setLoading(false);
    }
  };

  // Delete department by ID
  const handleDeleteDepartment = async () => {
    if (departmentToDelete) {
      try {
        await fetch(`/api/v1/institute/department/delete/${departmentToDelete}`, {
          method: 'DELETE',
        });
        fetchDepartments();
        toast.success('Deleted successful!');
        setDeleteModalOpen(false); // Close modal after deletion
      } catch (error) {
        toast.error(error.message);
        console.error('Error deleting department:', error);
      }
    }
  };

  // Open delete confirmation modal
  const openDeleteModal = (departmentId) => {
    setDepartmentToDelete(departmentId);
    setDeleteModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Departments</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => setShowModal(true)}
        >
          Add Department
        </button>
      </div>

      {/* Department List */}
      {loading ? (
       <div className="flex justify-center items-center h-30">
       <div className="spinner border-t-4 border-blue-500 border-solid rounded-full w-16 h-16 animate-spin"></div>
     </div>
     
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {departments.map((department) => (
            <DepartmentCard
              key={department._id}
              department={department}
              onDelete={() => openDeleteModal(department._id)} // Open confirmation modal on delete
            />
          ))}
        </div>
      )}

      {/* Add Department Modal */}
      {showModal && (
        <AddDepartmentModal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
          }}
          onSuccess={fetchDepartments}
        />
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)} // Close modal on No
        onConfirm={handleDeleteDepartment} // Confirm delete
        item={"department"}
      />
    </div>
  );
};

export default DepartmentsPage;
