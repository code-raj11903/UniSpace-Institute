import React from 'react';

const ViewOrderModal = ({ isOpen, order, onClose }) => {
  if (!isOpen || !order) return null;

  const statusClass = order.status === 'Confirmed' ? 'text-green-500' : 'text-red-500';

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full max-h-screen overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Order Details</h2>

        <div className="mb-4">
          <h3 className="font-semibold">Order ID:</h3>
          <p>{order._id}</p>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold">User Information:</h3>
          <p><strong>Name:</strong> {order.user_id.name}</p>
          <p><strong>Email:</strong> {order.user_id.email}</p>
          <p><strong>Address:</strong> {order.user_id.address}</p>
          <p><strong>Mobile:</strong> {order.user_id.mobile}</p>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold">Ordered Resources:</h3>
          {order.resource_ids.map(resource => (
            <div key={resource._id} className="mb-4">
              <p><strong>Name:</strong> {resource.name}</p>
              <p><strong>Type:</strong> {resource.type}</p>
              <p><strong>Description:</strong> {resource.description}</p>
              <p><strong>Price Per Day:</strong> ₹{resource.price_per_day}</p>
              {resource.image_url && (
                <img src={resource.image_url} alt={resource.name} className="mt-2 w-full h-auto rounded-lg" />
              )}
            </div>
          ))}
        </div>

        <div className="mb-4">
          <p className={statusClass}><strong>Status:</strong> {order.status}</p>
          <p><strong>Booked Date:</strong> {new Date(order.date).toLocaleString()}</p>
          <p><strong>Start Date:</strong> {new Date(order.start_date).toLocaleString()}</p>
          <p><strong>End Date:</strong> {new Date(order.end_date).toLocaleString()}</p>
          <p><strong>Total Amount:</strong> ₹{order.total_amount}</p>
          <p><strong>Payment Status:</strong> {order.payment_status}</p>
        </div>

        <div className="flex justify-end">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewOrderModal;
