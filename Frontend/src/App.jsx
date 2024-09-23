import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import AddDepartment from './components/AddDepartment';
import DepartmentList from './components/DepartmentList';
import ProfileManagement from './components/ProfileManagement';
import OrderHistory from './components/OrderHistory';
import ResourceList from './components/ResourceList';  
import ResourceManagementForm from './components/ResourceManagement';
import DepartmentDashboard from './components/DepartmentDashboard'; 
import Home from './Home';  
import './App.css';

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

  const userType = 2;  // Set to 2 for department users (1 for Institute)

  return (
    <Router>
      <div className="grid-container">
        <div className="main-content container mx-auto px-4 md:px-6 lg:px-8 mt-6">
          <Navbar userType={userType} />
          <Routes>
            {userType === 1 ? (
              // Institute Routes
              <>
                <Route path="/" element={<Home />} />
                <Route path="/App" element={<Home />} />
                <Route path="/departments/add" element={<AddDepartment addDepartment={addDepartment} />} />
                <Route path="/departments/list" element={<DepartmentList departments={departments} />} />
                <Route path="/profile-management/update" element={<ProfileManagement />} />
                <Route path="/profile-management/orders" element={<OrderHistory />} />
                <Route path="/add-resource" element={<ResourceManagementForm />} />
                <Route path="/resource-list" element={<ResourceList />} />
              </>
            ) : (
              // Department Routes
              <>
                <Route path="/" element={<DepartmentDashboard />} /> {/* Department Dashboard as home */}
                <Route path="/App" element={<DepartmentDashboard />} /> {/* Redirect to Department Dashboard */}
                <Route path="/profile-management/update" element={<ProfileManagement />} />
                <Route path="/profile-management/orders" element={<OrderHistory />} />
                <Route path="/add-resource" element={<ResourceManagementForm />} />
                <Route path="/resource-list" element={<ResourceList />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
