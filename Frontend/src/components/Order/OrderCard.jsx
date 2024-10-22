import React from 'react';
import { FaRupeeSign } from 'react-icons/fa';
const OrderCard = ({ order, onView}) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg p-4">
      <h3 className="text-xl font-bold">Order ID: {(order._id).toLocaleString()}</h3>
      <p>Status: {order.status}</p>
      <p>Date: {new Date(order.date).toLocaleString()}</p>
      <p>Total Amount: <FaRupeeSign className='sm inline'/>{order.total_amount}</p>
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
