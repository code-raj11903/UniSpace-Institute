import React, { useState, useEffect, useContext } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { AuthContext } from "../context/AuthContext"; 

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

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
            // Add token if required
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

  if (loading) return <div>Loading...</div>;
  if (!dashboardData) return <div>No data available</div>;

  // const revenueChartData = {
  //   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  //   datasets: [{
  //     label: 'Revenue',
  //     data: dashboardData.orderStats.map(stat => stat.totalOrders),
  //     borderColor: '#6366F1',
  //     fill: false,
  //   }],
  // };

  const resourceChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [{
      label: 'Resources',
      data: dashboardData.resourceStats.map(stat => stat.totalResources),
      backgroundColor: '#34D399',
    }],
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-4 gap-4 mb-6">
        {/* Metrics */}
        {user.role === 'institute' && (
          <div className="bg-blue-500 text-white p-4 rounded shadow-md">
            <h3 className="text-xl font-semibold">DEPARTMENTS</h3>
            <p className="text-3xl">{dashboardData.totalDepartments || 'N/A'}</p>
          </div>
        )}
        <div className="bg-orange-500 text-white p-4 rounded shadow-md">
          <h3 className="text-xl font-semibold">RESOURCES</h3>
          <p className="text-3xl">{dashboardData.totalResources}</p>
        </div>
        {/* <div className="bg-red-500 text-white p-4 rounded shadow-md">
          <h3 className="text-xl font-semibold">REVENUE</h3>
          <p className="text-3xl">${dashboardData.totalRevenue.toLocaleString()}</p>
        </div> */}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-4">
        {/* <div className="bg-white p-4 rounded shadow-md">
          <Line data={revenueChartData} />
        </div> */}
        <div className="bg-white p-4 rounded shadow-md">
          <Bar data={resourceChartData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
