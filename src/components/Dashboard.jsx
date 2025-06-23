import React from 'react';
import { 
  DollarSign, 
  Users, 
  BedDouble, 
  TrendingUp,
  AlertTriangle,
  Calendar,
  Clock
} from 'lucide-react';

export const Dashboard = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'emerald',
    },
    {
      title: 'Occupancy Rate',
      value: `${stats.occupancyRate}%`,
      change: '+5.2%',
      trend: 'up',
      icon: BedDouble,
      color: 'blue',
    },
    {
      title: 'Total Guests',
      value: stats.totalGuests.toString(),
      change: '+8.1%',
      trend: 'up',
      icon: Users,
      color: 'indigo',
    },
    {
      title: 'Available Rooms',
      value: stats.availableRooms.toString(),
      change: '-3.2%',
      trend: 'down',
      icon: BedDouble,
      color: 'purple',
    },
  ];

  const recentActivities = [
    { id: 1, action: 'New booking', details: 'Room 305 - John Doe', time: '2 minutes ago', type: 'booking' },
    { id: 2, action: 'Check-out', details: 'Room 201 - Jane Smith', time: '15 minutes ago', type: 'checkout' },
    { id: 3, action: 'Maintenance request', details: 'Room 105 - AC repair', time: '1 hour ago', type: 'maintenance' },
    { id: 4, action: 'Inventory alert', details: 'Low stock: Towels', time: '2 hours ago', type: 'inventory' },
    { id: 5, action: 'Staff check-in', details: 'Emily Rodriguez', time: '3 hours ago', type: 'staff' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's what's happening at your hotel today.</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-gray-500">Today</p>
            <p className="text-lg font-semibold text-gray-900">{new Date().toLocaleDateString()}</p>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
            <Calendar className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
                <div className={`flex items-center space-x-1 text-sm ${
                  stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600'
                }`}>
                  <TrendingUp className={`w-4 h-4 ${stat.trend === 'down' ? 'rotate-180' : ''}`} />
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                <p className="text-gray-600 text-sm mt-1">{stat.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue Trend</h3>
          <div className="h-64 flex items-end justify-between space-x-2">
            {stats.monthlyRevenue.map((revenue, index) => {
              const height = (revenue / Math.max(...stats.monthlyRevenue)) * 100;
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-gradient-to-t from-blue-500 to-indigo-600 rounded-t-lg transition-all duration-500 hover:from-blue-600 hover:to-indigo-700"
                    style={{ height: `${height}%` }}
                  ></div>
                  <span className="text-xs text-gray-500 mt-2">
                    {new Date(2024, index).toLocaleDateString('en', { month: 'short' })}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activity.type === 'booking' ? 'bg-emerald-100' :
                  activity.type === 'checkout' ? 'bg-blue-100' :
                  activity.type === 'maintenance' ? 'bg-orange-100' :
                  activity.type === 'inventory' ? 'bg-red-100' :
                  'bg-purple-100'
                }`}>
                  <div className={`w-3 h-3 rounded-full ${
                    activity.type === 'booking' ? 'bg-emerald-500' :
                    activity.type === 'checkout' ? 'bg-blue-500' :
                    activity.type === 'maintenance' ? 'bg-orange-500' :
                    activity.type === 'inventory' ? 'bg-red-500' :
                    'bg-purple-500'
                  }`}></div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.details}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <Clock className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center space-x-3 p-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all">
            <Users className="w-5 h-5" />
            <span className="font-medium">New Booking</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all">
            <BedDouble className="w-5 h-5" />
            <span className="font-medium">Check-in Guest</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all">
            <AlertTriangle className="w-5 h-5" />
            <span className="font-medium">Maintenance Request</span>
          </button>
        </div>
      </div>
    </div>
  );
};