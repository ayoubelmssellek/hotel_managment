import React, { useState } from 'react';

export const AddClientModal = ({ onClose, onAdd }) => {
  const [newClient, setNewClient] = useState({
    name: '',
    phone: '',
    nationality: '',
    vipStatus: 'regular',
    totalBookings: '',
    totalSpent: '',
    room: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewClient(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!newClient.name) {
      alert('Name  required!');
      return;
    }
    onAdd(newClient);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Add New Client</h2>

        <div className="space-y-3">
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            value={newClient.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          <input
            name="phone"
            type="text"
            placeholder="Phone Number"
            value={newClient.phone}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          <input
            name="nationality"
            type="text"
            placeholder="Nationality"
            value={newClient.nationality}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          <select
            name="vipStatus"
            value={newClient.vipStatus}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="regular">Regular</option>
            <option value="silver">Silver</option>
            <option value="gold">Gold</option>
            <option value="platinum">Platinum</option>
          </select>
          <input
            name="totalBookings"
            type="number"
            placeholder="Total Bookings"
            value={newClient.totalBookings}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          <input
            name="totalSpent"
            type="number"
            placeholder="Total Spent (USD)"
            value={newClient.totalSpent}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          <input
            name="room"
            type="text"
            placeholder="Room Number"
            value={newClient.room}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="mt-6 flex justify-end space-x-2">
          <button onClick={onClose} className="text-gray-600 hover:underline">Cancel</button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Add Client
          </button>
        </div>
      </div>
    </div>
  );
};
