import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import AddDepartment from './components/AddDepartment';
import DepartmentList from './components/DepartmentList';
import ProfileManagement from './components/ProfileManagement';
import InstituteResources from './components/InstituteResources';
import OrderHistory from './components/OrderHistory';
import ResourceManagement from './components/ResourceManagement';

const App = () => {
  const [departments, setDepartments] = useState([
    {
      id: 1,
      name: "Computer Science",
      email: "cs@institute.com",
      location: "Building A",
      contact: "123456789",
      password: "password123"
    },
    {
      id: 2,
      name: "Mechanical Engineering",
      email: "me@institute.com",
      location: "Building B",
      contact: "987654321",
      password: "password456"
    }
  ]);

  const [resources, setResources] = useState([
    { id: 1, name: "Projector", department: "Computer Science", type: "Equipment" },
    { id: 2, name: "Conference Room", department: "Mechanical Engineering", type: "Room" }
  ]);

  // Add new department
  const addDepartment = (department) => {
    setDepartments([...departments, { id: departments.length + 1, ...department }]);
  };

  // Delete department
  const deleteDepartment = (id) => {
    setDepartments(departments.filter(dept => dept.id !== id));
  };

  // Resource CRUD operations
  const addResource = (resource) => {
    setResources([...resources, { id: resources.length + 1, ...resource }]);
  };

  const updateResource = (updatedResource) => {
    setResources(resources.map(res => res.id === updatedResource.id ? updatedResource : res));
  };

  const deleteResource = (id) => {
    setResources(resources.filter(res => res.id !== id));
  };

  return (
    <Router>
      <Navbar />
      <div className="container mx-auto px-4 mt-6">
        <Routes>
          <Route path="/" element={<h1 className="text-3xl font-bold text-center mt-4">Analysis Dashboard</h1>} />
          <Route path="/departments" element={
            <>
              <AddDepartment addDepartment={addDepartment} />
              <DepartmentList departments={departments} deleteDepartment={deleteDepartment} />
            </>
          } />
          <Route path="/profile-management" element={<ProfileManagement />} />
          <Route path="/resources" element={
            <ResourceManagement
              resources={resources}
              addResource={addResource}
              updateResource={updateResource}
              deleteResource={deleteResource}
            />
          } />
          <Route path="/orders" element={<OrderHistory />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
