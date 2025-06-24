import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addRoom } from '../store/actions/clientActions'; // تأكد من المسار
import { X } from 'lucide-react';

export const AddRoomModal = ({ onClose }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    number: '',
    floor: '',
    type: 'single',
    price: '',
    status: 'available',
    amenities: [],
    lastCleaned: new Date().toISOString().split('T')[0],
    currentGuest: '',
    checkIn: '',
    checkOut: '',
  });

  const amenitiesOptions = ['wifi', 'tv', 'balcony', 'jacuzzi'];

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
    const newRoom = {
      ...formData,
      id: Date.now(), // مؤقتا ID عشوائي
      price: parseFloat(formData.price),
      floor: parseInt(formData.floor),
    };
    dispatch(addRoom(newRoom));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
          <X />
        </button>
        <h2 className="text-xl font-bold mb-4">Add New Room</h2>

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
              placeholder="Current Guest (optional)"
              className="border rounded px-3 py-2 w-full"
            />
            <input
              type="date"
              name="checkIn"
              value={formData.checkIn}
              onChange={handleChange}
              placeholder="Check-in"
              className="border rounded px-3 py-2 w-full"
            />
            <input
              type="date"
              name="checkOut"
              value={formData.checkOut}
              onChange={handleChange}
              placeholder="Check-out"
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
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add Room
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
