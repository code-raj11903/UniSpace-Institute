import React, { useEffect, useContext, useState } from 'react';
import OrderCard from '../components/Order/OrderCard';
import { AuthContext } from '../context/AuthContext';
import ViewOrderModal from '../components/Order/ViewOrderModal';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewModal, setviewModal] = useState(false);
  const [OrderToView, setOrderToView] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchOrders();
  }, []);

  // Fetch all departments

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/v1/${user.role}/orders`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();

      // Ensure the orders are an array or default to an empty array
      if (Array.isArray(data)) {
        setOrders(data);
      } else {
        setOrders([]); // Fallback in case the API returns something other than an array
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      setOrders([]); // Fallback in case of an error
    } finally {
      setLoading(false);
    }
  };
  const handleView = (order) => {
    setOrderToView(order);
    setviewModal(true);
  };


  return (
    <div className="container mx-auto p-4">
      {/* Order List */}
      {loading ? (
        <div className="flex justify-center items-center h-30">
          <div className="spinner border-t-4 border-blue-500 border-solid rounded-full w-16 h-16 animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {orders.length > 0 ? (
            orders.map((order) => (
              <OrderCard key={order._id} order={order} onView = {()=>{handleView(order)}} />
            ))
          ) : (
            <p className="text-center text-gray-500">No orders found</p>
          )}
        </div>
      )}
      {/* Add Department Modal */}
      {viewModal && (
        <ViewOrderModal
            isOpen={viewModal}
            order={OrderToView}  // Pass the selected order
            onClose={() => setviewModal(false)}  // Close modal function
        />
        )}

    </div>
  );
};

export default OrdersPage;
