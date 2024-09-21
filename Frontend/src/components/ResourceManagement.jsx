import React, { useState } from "react";

const ResourceManagement = () => {
  const [formData, setFormData] = useState({
    resourceType: "",
    resourceAddress: "",
    pricePerDay: "",
    description: "",
    resourceName: "",
    imageUpload: null,
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.resourceType) tempErrors.resourceType = "Resource type is required";
    if (!formData.resourceAddress) tempErrors.resourceAddress = "Resource address is required";
    if (!formData.pricePerDay || isNaN(formData.pricePerDay) || formData.pricePerDay < 0)
      tempErrors.pricePerDay = "Valid price per day (must be a non-negative number) is required";
    if (!formData.description) tempErrors.description = "Description is required";
    if (!formData.resourceName) tempErrors.resourceName = "Resource name is required";
    if (!formData.imageUpload) tempErrors.imageUpload = "Image upload is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({ ...formData, [name]: type === "file" ? files[0] : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted with:", formData);
    }
  };

  return (
    <div className="flex justify-center items-center ">
      <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-black mb-6">
          Add Resource
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-black font-semibold mb-2" htmlFor="resourceName">
              Resource Name
            </label>
            <input
              type="text"
              name="resourceName"
              id="resourceName"
              value={formData.resourceName}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.resourceName && <p className="text-red-500 mt-2">{errors.resourceName}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-black font-semibold mb-2" htmlFor="resourceType">
              Resource Type
            </label>
            <select
              name="resourceType"
              id="resourceType"
              value={formData.resourceType}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Resource Type</option>
              <option value="equipment">Equipment</option>
              <option value="furniture">Furniture</option>
              <option value="stationery">Stationery</option>
              <option value="software">Software</option>
            </select>
            {errors.resourceType && <p className="text-red-500 mt-2">{errors.resourceType}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-black font-semibold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.description && <p className="text-red-500 mt-2">{errors.description}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-black font-semibold mb-2" htmlFor="pricePerDay">
              Price per Day
            </label>
            <input
              type="number"
              name="pricePerDay"
              id="pricePerDay"
              value={formData.pricePerDay}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.pricePerDay && <p className="text-red-500 mt-2">{errors.pricePerDay}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-black font-semibold mb-2" htmlFor="resourceAddress">
              Resource Address
            </label>
            <input
              type="text"
              name="resourceAddress"
              id="resourceAddress"
              value={formData.resourceAddress}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.resourceAddress && <p className="text-red-500 mt-2">{errors.resourceAddress}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-black font-semibold mb-2" htmlFor="imageUpload">
              Upload Image
            </label>
            <input
              type="file"
              name="imageUpload"
              id="imageUpload"
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.imageUpload && <p className="text-red-500 mt-2">{errors.imageUpload}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Add Resource
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResourceManagement;
