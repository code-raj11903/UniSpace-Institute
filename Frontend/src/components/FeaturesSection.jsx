import React from 'react';

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12">Features of UniSpace</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">Department Management</h3>
            <p>Manage departments, update profiles, and track resources efficiently.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">Resource Booking</h3>
            <p>Easily book and manage resources with a streamlined interface.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">Advanced Analytics</h3>
            <p>Get insights into bookings, usage trends, and much more.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
