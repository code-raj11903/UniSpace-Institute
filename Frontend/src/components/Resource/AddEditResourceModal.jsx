import React, { useRef,useContext, useState } from 'react';
import usePreviewImg from '../../hooks/usePreviewImg';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';

const AddEditResourceModal = ({ isOpen, onClose, resource, onSuccess }) => {
  const [form, setForm] = useState({
    name: resource?.name || '',
    location: resource?.location || '',
    type: resource?.type || '',
    description: resource?.description || '',
    price_per_day: resource?.price_per_day || '',
  });
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const fileRef = useRef(null);
  const { handleImageChange, imgUrl,setImgUrl } = usePreviewImg();



  const handleSubmit = async () => {
    // Validate the price per day to ensure it's not negative
    if (form.price_per_day < 0) {
      setErrorMessage('Price per day cannot be negative.');
      return;
    }
    setLoading(true);
    const method = resource ? 'PUT' : 'POST';
    const url = resource
      ? `/api/v1/${user.role}/resources/update/${resource._id}`
      : `/api/v1/${user.role}/resources/add`;

    try {
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, image_url: imgUrl }),
      });
      toast.success('Resource saved successfully!');
      onSuccess();
      onClose();
    } catch (error) {
      toast.error('Error saving resource.');
      console.error('Error saving resource:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? '' : 'hidden'}`}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-4 sm:mx-auto h-full sm:h-auto max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl mb-4">{resource ? 'Edit Resource' : 'Add Resource'}</h2>

        {/* Name Input */}
        <div className="mb-4">
          <label className="block mb-2 text-black">Resource Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded bg-white text-black"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        {/* Location Input */}
        <div className="mb-4">
          <label className="block mb-2 text-black">Location</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded bg-white text-black"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />
        </div>

        {/* Type Input */}
        <div className="mb-4">
          <label className="block mb-2 text-black">Type</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded bg-white text-black"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          />
        </div>

        {/* Description Input */}
        <div className="mb-4">
          <label className="block mb-2 text-black">Description</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded bg-white text-black"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={4}
          />
        </div>

        {/* Price Per Day Input */}
        <div className="mb-4">
          <label className="block mb-2 text-black">Price Per Day</label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded bg-white text-black"
            value={form.price_per_day}
            min="0" // Ensures price cannot be negative
            onChange={(e) => setForm({ ...form, price_per_day: e.target.value })}
          />
          {errorMessage && <p className="text-red-500 text-sm mt-1">{errorMessage}</p>}
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block mb-2 text-black">Upload Image</label>
          <button className="w-full p-2 border border-gray-300 rounded bg-white text-black" onClick={() => fileRef.current.click()}>
            Upload Image
          </button>
          <input type="file" hidden ref={fileRef} onChange={handleImageChange} />
          {<img src={imgUrl ||resource?.image_url} alt="Resource" className="mt-2" />}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end">
          <button className="bg-gray-500 text-white px-4 py-2 rounded mr-2" onClick={onClose}>
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
            disabled={loading}
          >{loading ? (
            <svg
              className="animate-spin h-5 w-5 text-white mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
          ) : (
            'Save'
          )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEditResourceModal;
