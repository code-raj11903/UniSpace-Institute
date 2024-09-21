import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import AddDepartment from './components/AddDepartment';
import DepartmentList from './components/DepartmentList';
import ProfileManagement from './components/ProfileManagement';
import OrderHistory from './components/OrderHistory';
import ResourceManagementForm from './components/ResourceManagement'; // Import the new form

import Home from './Home';  // Import the home component
import './App.css'
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

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const addDepartment = (department) => {
    setDepartments([...departments, { id: departments.length + 1, ...department }]);
  };

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <Router>
      <div className="grid-container">
        
        <div className="main-content container mx-auto px-4 mt-6">
          <Navbar />
          <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/App" element={<Home />} />
            <Route path="/departments/add" element={<AddDepartment addDepartment={addDepartment} />} />
            <Route path="/departments/list" element={<DepartmentList departments={departments} />} />
            <Route path="/profile-management/update" element={<ProfileManagement />} />
            <Route path="/profile-management/orders" element={<OrderHistory />} />
            <Route path="/add-resource" element={<ResourceManagementForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;