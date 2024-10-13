import React, { useEffect, useState } from 'react';
import DepartmentCard from '../components/Department/DepartmentCard';
import AddEditDepartmentModal from '../components/Department/AddEditDepartmentModal';

const DepartmentsPage = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editDepartment, setEditDepartment] = useState(null);

  useEffect(() => {
    fetchDepartments();
  }, []);

  // Fetch all departments
  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const res= await fetch(`/api/v1/institute/department`, {
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
  const handleDeleteDepartment = async (departmentId) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      try {
        await fetch(`/api/v1/institute/department/delete/${departmentId}`, {
          method: 'DELETE',
        });
        fetchDepartments(); // Refresh department list after deletion
      } catch (error) {
        console.error('Error deleting department:', error);
      }
    }
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
        <div className="flex justify-center items-center h-40">
          <div className="spinner border-t-4 border-blue-500 border-solid rounded-full w-16 h-16"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {departments.map((department) => (
            <DepartmentCard
              key={department._id}
              department={department}
              onDelete={() => handleDeleteDepartment(department._id)}
            />
          ))}
        </div>
      )}

      {/* Add Department Modal */}
      {showModal && (
        <AddEditDepartmentModal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setEditDepartment(null);
          }}
          onSuccess={fetchDepartments}
        />
      )}
    </div>
  );
};

export default DepartmentsPage;
