// Settings.jsx
import React, { useState, useContext } from "react";
import EditProfile from "../components/EditProfile"; // Corrected path based on file structure
import { FaUniversity, FaSchool } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext"; // Corrected path

const Settings = ({ isDarkMode, toggleDarkMode }) => {
  const [activeTab, setActiveTab] = useState('theme');
  const { user } = useContext(AuthContext);

  // Default profile icon based on user role
  const profileIcon = user.role === 'institute' ? <FaUniversity size={64} /> : <FaSchool size={64} />;

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-6 bg-light-100 dark:bg-light-800 pt-20">
      <h1 className="text-3xl font-bold mb-8 text-black dark:text-white">Settings</h1>

      {/* Profile Icon and Info */}
      <div className="flex items-center mb-6">
        <div className="mr-4 text-black dark:text-white">{profileIcon}</div>
        <div>
          <h2 className="text-xl font-semibold text-black dark:text-white">{user?.name}</h2>
          <p className="text-gray-600 dark:text-black">{user?.role === 'institute' ? 'Institute' : 'Department'}</p>
        </div>
      </div>

      {/* Tabs for Theme and Edit Profile */}
      <div className="flex mb-8 border-b w-full max-w-md justify-center">
        <button
          onClick={() => setActiveTab('theme')}
          className={`p-2 w-1/2 text-center ${activeTab === 'theme' ? 'border-b-2 border-blue-500 bg-blue-200 dark:bg-blue-700' : 'bg-white dark:bg-gray-800'}`}
        >
          Theme
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`p-2 w-1/2 text-center ${activeTab === 'profile' ? 'border-b-2 border-blue-500 bg-blue-200 dark:bg-blue-700' : 'bg-white dark:bg-gray-800'}`}
        >
          Edit Profile
        </button>
      </div>

      {/* Active Tab Content */}
      <div className="w-full max-w-md">
        {activeTab === 'theme' && (
          <div className="text-center">
            <h2 className="text-lg font-bold mb-4 text-black dark:text-white">Theme Settings</h2>
            <button
              className="p-2 bg-gray-300 dark:bg-blue-600 text-black dark:text-white rounded hover:bg-blue-400 dark:hover:bg-blue-500 transition duration-300"
              onClick={toggleDarkMode}
            >
              {isDarkMode ? 'Disable Dark Mode' : 'Enable Dark Mode'}
            </button>
          </div>
        )}

        {activeTab === 'profile' && <EditProfile />}
      </div>
    </div>
  );
};

export default Settings;
