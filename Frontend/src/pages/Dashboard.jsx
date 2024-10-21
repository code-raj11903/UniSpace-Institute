import React, { useState, useEffect, useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { AuthContext } from "../context/AuthContext";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        let url = `/api/v1/${user.role}/dashboard`; // Dynamic based on user role

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Error fetching dashboard data');
        }

        const data = await response.json();
        setDashboardData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user.role]);

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (!dashboardData) return <div className="flex items-center justify-center h-screen">No data available</div>;

  const resourceChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [{
      label: 'Resources',
      data: dashboardData.resourceStats.map(stat => stat.totalResources),
      backgroundColor: '#34D399',
    }],
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 -mt-8"> {/* Reduced top margin */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 max-w-xl"> {/* Reduced grid size */}
        {/* Metrics */}
        {user.role === 'institute' && (
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md text-center text-lg w-64 h-32"> {/* Decreased box size */}
            <h3 className="text-2xl font-semibold">DEPARTMENTS</h3>
            <p className="text-4xl">{dashboardData.totalDepartments || 'N/A'}</p>
          </div>
        )}
        <div className="bg-orange-500 text-white p-6 rounded-lg shadow-md text-center text-lg w-64 h-32"> {/* Decreased box size */}
          <h3 className="text-2xl font-semibold">RESOURCES</h3>
          <p className="text-4xl">{dashboardData.totalResources}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-xl"> {/* Decreased chart container */}
        <Bar data={resourceChartData} />
      </div>
    </div>
  );
};

export default Dashboard;
