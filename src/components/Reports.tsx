import React, { useState } from 'react';
import { 
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  DollarSign,
  Users,
  BedDouble,
  Filter,
  FileText,
  PieChart,
  Activity
} from 'lucide-react';
import { DashboardStats } from '../types';

interface ReportsProps {
  stats: DashboardStats;
}

export const Reports: React.FC<ReportsProps> = ({ stats }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedReport, setSelectedReport] = useState('overview');

  const reportTypes = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'revenue', name: 'Revenue', icon: DollarSign },
    { id: 'occupancy', name: 'Occupancy', icon: BedDouble },
    { id: 'guests', name: 'Guests', icon: Users },
    { id: 'performance', name: 'Performance', icon: TrendingUp },
  ];

  const periods = [
    { id: 'week', name: 'This Week' },
    { id: 'month', name: 'This Month' },
    { id: 'quarter', name: 'This Quarter' },
    { id: 'year', name: 'This Year' },
  ];

  const generateReportData = () => {
    // Mock data for different report types
    const baseData = {
      overview: {
        title: 'Hotel Performance Overview',
        metrics: [
          { label: 'Total Revenue', value: `$${stats.totalRevenue.toLocaleString()}`, change: '+12.5%', trend: 'up' },
          { label: 'Occupancy Rate', value: `${stats.occupancyRate}%`, change: '+5.2%', trend: 'up' },
          { label: 'Average Daily Rate', value: '$185', change: '+8.1%', trend: 'up' },
          { label: 'RevPAR', value: '$144', change: '+18.3%', trend: 'up' },
        ],
        chartData: stats.monthlyRevenue,
      },
      revenue: {
        title: 'Revenue Analysis',
        metrics: [
          { label: 'Room Revenue', value: '$95,000', change: '+15.2%', trend: 'up' },
          { label: 'F&B Revenue', value: '$18,500', change: '+8.7%', trend: 'up' },
          { label: 'Other Revenue', value: '$11,500', change: '+22.1%', trend: 'up' },
          { label: 'Total Revenue', value: '$125,000', change: '+12.5%', trend: 'up' },
        ],
        chartData: [95000, 18500, 11500],
      },
      occupancy: {
        title: 'Occupancy Report',
        metrics: [
          { label: 'Current Occupancy', value: '78%', change: '+5.2%', trend: 'up' },
          { label: 'Average Length of Stay', value: '2.3 days', change: '+0.5%', trend: 'up' },
          { label: 'No-Show Rate', value: '3.2%', change: '-1.1%', trend: 'down' },
          { label: 'Cancellation Rate', value: '8.5%', change: '-2.3%', trend: 'down' },
        ],
        chartData: [65, 72, 78, 85, 82, 78],
      },
    };

    return baseData[selectedReport as keyof typeof baseData] || baseData.overview;
  };

  const reportData = generateReportData();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-2">Comprehensive insights and performance metrics</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg">
            <Download className="w-5 h-5" />
            <span className="font-medium">Export Report</span>
          </button>
        </div>
      </div>

      {/* Report Type and Period Selection */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">Report Type:</span>
            </div>
            <div className="flex space-x-2">
              {reportTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => setSelectedReport(type.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                      selectedReport === type.id
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{type.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">Period:</span>
            </div>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {periods.map((period) => (
                <option key={period.id} value={period.id}>
                  {period.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reportData.metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center space-x-1 text-sm ${
                metric.trend === 'up' ? 'text-emerald-600' : 'text-red-600'
              }`}>
                <TrendingUp className={`w-4 h-4 ${metric.trend === 'down' ? 'rotate-180' : ''}`} />
                <span>{metric.change}</span>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{metric.value}</h3>
              <p className="text-gray-600 text-sm mt-1">{metric.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Main Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">{reportData.title}</h3>
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-600">Monthly Trend</span>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between space-x-2">
            {reportData.chartData.map((value, index) => {
              const maxValue = Math.max(...reportData.chartData);
              const height = (value / maxValue) * 100;
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-gradient-to-t from-blue-500 to-indigo-600 rounded-t-lg transition-all duration-700 hover:from-blue-600 hover:to-indigo-700 cursor-pointer"
                    style={{ height: `${height}%` }}
                    title={`${selectedReport === 'revenue' ? '$' : ''}${value.toLocaleString()}`}
                  ></div>
                  <span className="text-xs text-gray-500 mt-2">
                    {selectedReport === 'occupancy' 
                      ? `Week ${index + 1}`
                      : new Date(2024, index).toLocaleDateString('en', { month: 'short' })
                    }
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Performance Indicators */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Indicators</h3>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Customer Satisfaction</span>
                <span className="text-sm text-gray-900">4.8/5.0</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full" style={{ width: '96%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Staff Efficiency</span>
                <span className="text-sm text-gray-900">87%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full" style={{ width: '87%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Online Reviews</span>
                <span className="text-sm text-gray-900">4.6/5.0</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-600 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Repeat Guests</span>
                <span className="text-sm text-gray-900">65%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Analysis */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Detailed Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-md font-medium text-gray-900 mb-4">Revenue Breakdown</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Room Revenue</span>
                <span className="text-sm font-medium text-gray-900">76%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Food & Beverage</span>
                <span className="text-sm font-medium text-gray-900">15%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Services</span>
                <span className="text-sm font-medium text-gray-900">9%</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-md font-medium text-gray-900 mb-4">Top Room Types</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Suite</span>
                <span className="text-sm font-medium text-gray-900">35%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Deluxe</span>
                <span className="text-sm font-medium text-gray-900">28%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Double</span>
                <span className="text-sm font-medium text-gray-900">25%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Single</span>
                <span className="text-sm font-medium text-gray-900">12%</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-md font-medium text-gray-900 mb-4">Booking Channels</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Direct</span>
                <span className="text-sm font-medium text-gray-900">45%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Online Travel Agencies</span>
                <span className="text-sm font-medium text-gray-900">32%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Travel Agents</span>
                <span className="text-sm font-medium text-gray-900">23%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};