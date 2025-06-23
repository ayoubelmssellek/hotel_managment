import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateRoom } from '../store/actions/clientActions';
import { X } from 'lucide-react';

export const UpdateRoomModal = ({ room, onClose }) => {
  const dispatch = useDispatch();

  // دالة لتحويل التاريخ إلى نص بصيغة YYYY-MM-DD
  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    if (isNaN(d)) return '';
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = useState({
    number: '',
    floor: '',
    type: '',
    price: '',
    status: '',
    amenities: [],
    lastCleaned: '',
    currentGuest: '',
    checkIn: '',
    checkOut: '',
  });

  useEffect(() => {
    if (room) {
      setFormData({
        ...room,
        price: room.price.toString(),
        floor: room.floor.toString(),
        checkIn: formatDate(room.checkIn),
        checkOut: formatDate(room.checkOut),
        lastCleaned: formatDate(room.lastCleaned),
      });
    }
  }, [room]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAmenityToggle = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateRoom({
      ...formData,
      id: room.id,
      price: parseFloat(formData.price),
      floor: parseInt(formData.floor, 10),
    }));
    onClose();
  };

  const amenitiesOptions = ['wifi', 'tv', 'mini bar', 'balcony', 'jacuzzi'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
          <X />
        </button>
        <h2 className="text-xl font-bold mb-4">Update Room</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="number"
              value={formData.number}
              onChange={handleChange}
              placeholder="Room Number"
              className="border rounded px-3 py-2 w-full"
              required
            />
            <input
              type="number"
              name="floor"
              value={formData.floor}
              onChange={handleChange}
              placeholder="Floor"
              className="border rounded px-3 py-2 w-full"
              required
            />
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
              required
            >
              <option value="single">Single</option>
              <option value="double">Double</option>
              <option value="suite">Suite</option>
              <option value="deluxe">Deluxe</option>
              <option value="presidential">Presidential</option>
            </select>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price per Night"
              className="border rounded px-3 py-2 w-full"
              required
            />
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
              required
            >
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
              <option value="maintenance">Maintenance</option>
              <option value="cleaning">Cleaning</option>
            </select>
            <input
              type="date"
              name="lastCleaned"
              value={formData.lastCleaned}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
              required
            />
          </div>

          <div>
            <label className="font-medium block mb-2">Amenities</label>
            <div className="flex flex-wrap gap-3">
              {amenitiesOptions.map((amenity) => (
                <label key={amenity} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.amenities.includes(amenity)}
                    onChange={() => handleAmenityToggle(amenity)}
                  />
                  <span className="capitalize">{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="currentGuest"
              value={formData.currentGuest}
              onChange={handleChange}
              placeholder="Current Guest"
              className="border rounded px-3 py-2 w-full"
            />
            <input
              type="date"
              name="checkIn"
              value={formData.checkIn}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
            />
            <input
              type="date"
              name="checkOut"
              value={formData.checkOut}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
            />
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
