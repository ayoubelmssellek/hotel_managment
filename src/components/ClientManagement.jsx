import React, { useState } from 'react';
import {
  Plus, Search, Filter, User, Phone, MapPin,
  Crown, CreditCard, Calendar, Edit3, Trash2, Star
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { AddClientModal } from './AddClientModal';
import { UpdateClientModal } from './UpdateClientModal';

import { addClient, deleteClient} from '../store/actions/clientActions';

export const ClientManagement = () => {
  const dispatch = useDispatch();
  const clients = useSelector(state => state.listClient);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterVipStatus, setFilterVipStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingClient, setEditingClient] = useState(null);


  const filteredClients = clients.filter(client => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesVip = filterVipStatus === 'all' || client.vipStatus === filterVipStatus;
    return matchesSearch && matchesVip;
  });

  const handleDeleteClient = (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      dispatch(deleteClient(id));
    }
  };

  const getVipColor = (status) => {
    switch (status) {
      case 'platinum': return 'bg-gray-800 text-white';
      case 'gold': return 'bg-yellow-100 text-yellow-800';
      case 'silver': return 'bg-gray-100 text-gray-800';
      case 'regular': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getVipIcon = (status) => {
    switch (status) {
      case 'platinum': return <Crown className="w-4 h-4" />;
      case 'gold': return <Star className="w-4 h-4" />;
      case 'silver': return <Star className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Client Management</h1>
          <p className="text-gray-600 mt-2">Manage your hotel guests and their information</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Add Client</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border rounded-lg"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterVipStatus}
              onChange={(e) => setFilterVipStatus(e.target.value)}
              className="border rounded-lg px-3 py-2"
            >
              <option value="all">All VIP Status</option>
              <option value="platinum">Platinum</option>
              <option value="gold">Gold</option>
              <option value="silver">Silver</option>
              <option value="regular">Regular</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">Client Directory</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">VIP</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bookings</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Spent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Room</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-sm">
                          {client.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{client.name}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <div className="flex items-center space-x-1">
                            <Phone className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-500">{client.phone}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1 mt-1">
                          <MapPin className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">{client.nationality}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded-full ${getVipColor(client.vipStatus)}`}>
                      {getVipIcon(client.vipStatus)}
                      <span>{client.vipStatus}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">{client.totalBookings > 1 ? `${client.totalBookings} days` : `${client.totalBookings} day`}</td>
                  <td className="px-6 py-4 text-sm">${client.totalSpent.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm">{client.room}</td>
                  <td className="px-6 py-4">
                    <button onClick={() => handleDeleteClient(client.id)} className="text-red-600 hover:text-red-800">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setEditingClient(client)}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredClients.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">No clients found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <AddClientModal
          onClose={() => setShowAddModal(false)}
          onAdd={(newClient) => {
            dispatch(addClient({ ...newClient, id: Date.now() }));
            setShowAddModal(false);
          }}
        />
      )}

      {editingClient && (
        <UpdateClientModal
          client={editingClient}
          onClose={() => setEditingClient(null)}
        />
      )}

    </div>
  );
};
