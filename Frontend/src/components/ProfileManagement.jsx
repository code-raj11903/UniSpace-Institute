import React, { useState } from 'react';
import DepartmentProfile from './DepartmentProfile';
import InstituteProfile from './InstituteProfile';

const ProfileManagement = () => {
  const [selectedProfile, setSelectedProfile] = useState('department'); // default view

  return (
    <div className="container mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4">Profile Management</h2>
      <div className="flex justify-around mb-6">
        <button 
          onClick={() => setSelectedProfile('department')} 
          className={`px-4 py-2 rounded ${selectedProfile === 'department' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Department Profile
        </button>
        <button 
          onClick={() => setSelectedProfile('institute')} 
          className={`px-4 py-2 rounded ${selectedProfile === 'institute' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Institute Profile
        </button>
      </div>

      {selectedProfile === 'department' ? <DepartmentProfile /> : <InstituteProfile />}
    </div>
  );
};

export default ProfileManagement;
