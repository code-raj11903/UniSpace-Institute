import React from 'react';

const OrderHistory = ({ orders }) => {
  // Ensure orders has a default value of an empty array if it's undefined
  const orderList = orders || [];

  return (
    <div>
      <h2 className="text-2xl font-bold">Order History</h2>
      {orderList.length > 0 ? (
        <ul>
          {orderList.map((order, index) => (
            <li key={index} className="my-2 p-2 border border-gray-300">
              <p>Order ID: {order.id}</p>
              <p>Item: {order.item}</p>
              <p>Quantity: {order.quantity}</p>
              <p>Date: {order.date}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No order history available.</p>
      )}
    </div>
  );
};

export default OrderHistory;
