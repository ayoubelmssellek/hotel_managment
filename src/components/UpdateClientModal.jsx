import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateClient } from '../store/actions/clientActions';

export const UpdateClientModal = ({ client, onClose }) => {
  const dispatch = useDispatch();

  // نحتفظ بنسخة محلية من بيانات العميل لتعديلها
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    nationality: '',
    vipStatus: 'regular',
    totalBookings: 0,
    totalSpent: 0,
    room: '' ,
  });

  // نعمر الفورم ببيانات العميل اللي جا من props
  useEffect(() => {
    if (client) {
      setFormData({
        name: client.name,
        phone: client.phone,
        nationality: client.nationality,
        vipStatus: client.vipStatus,
        totalBookings: client.totalBookings,
        totalSpent: client.totalSpent,
        room: client.room,
      });
    }
  }, [client]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateClient({ ...formData, id: client.id }));
    console.log('Updated Client:', formData);
    
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Update Client</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
<div className="space-y-3">
    <div>
      <label className="block text-sm font-medium">Name</label>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
        required
      />
    </div>
  </div>

  {/* صف 2 */}
  <div className="grid grid-cols-2 gap-4">
    <div>
      <label className="block text-sm font-medium">Phone</label>
      <input
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
      />
    </div>

    <div>
      <label className="block text-sm font-medium">Nationality</label>
      <input
        name="nationality"
        value={formData.nationality}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
      />
    </div>
  </div>

  {/* صف 3 */}
  <div className="grid grid-cols-2 gap-4">
    <div>
      <label className="block text-sm font-medium">VIP Status</label>
      <select
        name="vipStatus"
        value={formData.vipStatus}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
      >
        <option value="regular">Regular</option>
        <option value="silver">Silver</option>
        <option value="gold">Gold</option>
        <option value="platinum">Platinum</option>
      </select>
    </div>

    <div>
      <label className="block text-sm font-medium">Total Bookings</label>
      <input
        name="totalBookings"
        type="number"
        min="0"
        value={formData.totalBookings}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
      />
    </div>
  </div>

  {/* صف 4 */}
  <div className="grid grid-cols-2 gap-4">
    <div>
      <label className="block text-sm font-medium">Total Spent ($)</label>
      <input
        name="totalSpent"
        type="number"
        min="0"
        value={formData.totalSpent}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
      />
    </div>

    {/* هنا خلي العمود الثاني فارغ ولا ممكن تزيد شي حاجة */}
    <div>
      <label className="block text-sm font-medium">Room</label>
      <input
        name="room"
        type="number"
        min="0"
        value={formData.room}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
      />
    </div>
  </div>

  <div className="flex justify-end space-x-4 mt-6">
    <button
      type="button"
      onClick={onClose}
      className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
    >
      Cancel
    </button>
    <button
      type="submit"
      className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
    >
      Save
    </button>
  </div>
        </form>
      </div>
    </div>
  );
};
