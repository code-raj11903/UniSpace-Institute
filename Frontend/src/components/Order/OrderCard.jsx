import React from 'react';
import { FaRupeeSign } from 'react-icons/fa';

const OrderCard = ({ order, onView }) => {
  // Conditionally apply class for status
  const statusClass = order.status === 'Confirmed' ? 'text-green-500' : 'text-red-500';
  const expiredClass = order.status === 'Confirmed' ? '' : 'opacity-80';
  return (
    <div className={`border rounded-lg overflow-hidden shadow-lg p-4 ${expiredClass}`}>
      <h3 className="text-xl font-bold">Order ID: {order._id}</h3>
      <p className={statusClass}>Status: {order.status}</p>
      <p>Booked Date: {new Date(order.date).toLocaleString()}</p>
      <p>Start Date: {new Date(order.start_date).toLocaleString()}</p>
      <p>End Date: {new Date(order.end_date).toLocaleString()}</p>
      <p>Total Amount: <FaRupeeSign className="inline" />{order.total_amount}</p>
      <p>Payment Status: {order.payment_status}</p>
      <div className="mt-4">
        <button
          onClick={onView}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          View
        </button>
      </div>
    </div>
  );
};

export default OrderCard;
