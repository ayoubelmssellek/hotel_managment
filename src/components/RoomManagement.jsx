import React, { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {
  Plus, Search, Filter, BedDouble, Wifi, Tv, Car,
  Coffee, Bath, Users, AlertCircle, CheckCircle,
  Clock, Settings, Edit3, Trash2
} from 'lucide-react';
import { AddRoomModal } from './AddRoomModal';
import { UpdateRoomModal } from './UpdateRoomModal';
import { deleteRoom } from '../store/actions/clientActions';

export const RoomManagement = () => {
  const rooms = useSelector((state) => state.listRoom);
  const dispatch = useDispatch();

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);


  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || room.status === filterStatus;
    const matchesType = filterType === 'all' || room.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-emerald-100 text-emerald-800';
      case 'occupied': return 'bg-blue-100 text-blue-800';
      case 'maintenance': return 'bg-orange-100 text-orange-800';
      case 'cleaning': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available': return <CheckCircle className="w-4 h-4" />;
      case 'occupied': return <Users className="w-4 h-4" />;
      case 'maintenance': return <AlertCircle className="w-4 h-4" />;
      case 'cleaning': return <Clock className="w-4 h-4" />;
      default: return <Settings className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'single': return 'bg-blue-100 text-blue-800';
      case 'double': return 'bg-green-100 text-green-800';
      case 'suite': return 'bg-purple-100 text-purple-800';
      case 'deluxe': return 'bg-indigo-100 text-indigo-800';
      case 'presidential': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAmenityIcon = (amenity) => {
    switch (amenity.toLowerCase()) {
      case 'wifi': return <Wifi className="w-4 h-4" />;
      case 'tv': return <Tv className="w-4 h-4" />;
      case 'balcony': return <Car className="w-4 h-4" />;
      case 'jacuzzi': return <Bath className="w-4 h-4" />;
      default: return <Settings className="w-4 h-4" />;
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      dispatch(deleteRoom(id));
      console.log(`Room with ID ${id} deleted`);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Room Management</h1>
          <p className="text-gray-600 mt-2">Manage your hotel rooms and their availability</p>
        </div>
        <button  onClick={() => setShowAddModal(true)}
         className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg">
          <Plus className="w-5 h-5" />
          <span className="font-medium">Add Room</span>
        </button>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search rooms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border rounded-lg px-3 py-2"
              >
                <option value="all">All Status</option>
                <option value="available">Available</option>
                <option value="occupied">Occupied</option>
                <option value="maintenance">Maintenance</option>
                <option value="cleaning">Cleaning</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="border rounded-lg px-3 py-2"
              >
                <option value="all">All Types</option>
                <option value="single">Single</option>
                <option value="double">Double</option>
                <option value="suite">Suite</option>
                <option value="deluxe">Deluxe</option>
                <option value="presidential">Presidential</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Rooms', icon: <BedDouble />, count: rooms.length, color: 'blue' },
          { label: 'Available', icon: <CheckCircle />, count: rooms.filter(r => r.status === 'available').length, color: 'emerald' },
          { label: 'Occupied', icon: <Users />, count: rooms.filter(r => r.status === 'occupied').length, color: 'blue' },
          { label: 'Maintenance', icon: <AlertCircle />, count: rooms.filter(r => r.status === 'maintenance').length, color: 'orange' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                {React.cloneElement(stat.icon, { className: `w-5 h-5 text-${stat.color}-600` })}
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.count}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Room Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.map((room) => (
          <div key={room.id} className="bg-white rounded-xl border shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <BedDouble className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Room {room.number}</h3>
                    <p className="text-sm text-gray-600">Floor {room.floor}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={() => {setSelectedRoom(room) ; setShowUpdateModal(true);
                   }} className="text-blue-600 hover:text-blue-800">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <Trash2  onClick={() => handleDelete(room.id)} className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(room.type)}`}>
                  {room.type.charAt(0).toUpperCase() + room.type.slice(1)}
                </span>
                <span className="text-lg font-bold">${room.price}/night</span>
              </div>

              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(room.status)}`}>
                  {getStatusIcon(room.status)}
                  <span>{room.status.charAt(0).toUpperCase() + room.status.slice(1)}</span>
                </span>
                <span className="text-sm text-gray-600">
                  Cleaned: {new Date(room.lastCleaned).toLocaleDateString()}
                </span>
              </div>

              {room.currentGuest && (
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-sm font-medium text-blue-900">Current Guest</p>
                  <p className="text-sm text-blue-700">{room.currentGuest}</p>
                  <div className="flex items-center space-x-4 mt-1 text-xs text-blue-600">
                    <span>Check-in: {room.checkIn && new Date(room.checkIn).toLocaleDateString()}</span>
                    <span>Check-out: {room.checkOut && new Date(room.checkOut).toLocaleDateString()}</span>
                  </div>
                </div>
              )}

              <div>
                <p className="text-sm font-medium mb-2">Amenities</p>
                <div className="flex flex-wrap gap-2">
                  {room.amenities.map((a, idx) => (
                    <div key={idx} className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-full">
                      {getAmenityIcon(a)}
                      <span className="text-xs text-gray-700">{a}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
        {showAddModal && (
          <AddRoomModal
            onClose={() => {
              setShowAddModal(false);
              setSelectedRoom(null);
            }}
          />
        )}

        {showUpdateModal && selectedRoom && (
          <UpdateRoomModal
            room={selectedRoom}
            onClose={() => {
              setShowUpdateModal(false);
              setSelectedRoom(null);
            }}
          />
        )}
      </div>
    </div>
  );
};
