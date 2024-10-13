import React, { useState ,useContext} from 'react';
import EditProfile from '../components/EditProfile';
import { FaUserCircle, FaSchool, FaUniversity } from 'react-icons/fa';

import { AuthContext } from '../context/AuthContext';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('theme');
  
  const {user} = useContext(AuthContext);
  // Default profile icon based on user role
  const profileIcon = user.role === 'institute' ? (
    <FaUniversity/>
  ) : (
    <FaSchool/>
  )

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>

      {/* Profile Icon */}
      <div className="flex items-center mb-6">
        <img src={profileIcon} alt="Profile Icon" className="w-16 h-16 rounded-full mr-4" />
        <div>
          <h2 className="text-lg font-semibold">{user?.name}</h2>
          <p className="text-gray-600">{user?.role === 'institute' ? 'Institute' : 'Department'}</p>
        </div>
      </div>

      <div className="flex border-b mb-4">
        <button classname ="ml-4 mr-4" onClick={() => setActiveTab('theme')} className={`p-2 ${activeTab === 'theme' ? 'border-b-2 border-blue-500 bg-gray-200' : ' bg-white'}`}>Theme</button>
        <button classname ="ml-4 mr-4" onClick={() => setActiveTab('profile')} className={`p-2 ${activeTab === 'profile' ? 'border-b-2 border-blue-500 bg-gray-200' : ' bg-white'}`}>Edit Profile</button>
      </div>

      {activeTab === 'theme' && (
        <div>
          <h2 className="text-lg font-bold mb-2">Theme Settings</h2>
          <button className="p-2 bg-gray-200 rounded">Toggle Dark Mode</button>
        </div>
      )}

      {activeTab === 'profile' && <EditProfile />}
    </div>
  );
};

export default Settings;
