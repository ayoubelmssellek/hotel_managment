import React, { useState, useRef, useEffect } from 'react';
import { 
  Calendar,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Filter,
  Download,
  Plus,
  Info,
  User,
  Clock,
  DollarSign
} from 'lucide-react';
import { useSelector } from 'react-redux';

export const RoomPlanner = () => {
    const rooms = useSelector((state) => state.listRoom);
   const bookings = useSelector((state) => state.mockBookings);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('week');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);
  const timelineRef = useRef(null);



  const getDateRange = () => {
    const start = new Date(currentDate);
    const end = new Date(currentDate);
    
    if (viewMode === 'week') {
      start.setDate(start.getDate() - start.getDay());
      end.setDate(start.getDate() + 6);
    } else {
      start.setDate(1);
      end.setMonth(end.getMonth() + 1);
      end.setDate(0);
    }
    
    return { start, end };
  };

  const getDaysInRange = () => {
    const { start, end } = getDateRange();
    const days = [];
    const current = new Date(start);
    
    while (current <= end) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  };

  const getBookingPosition = (booking) => {
    const { start } = getDateRange();
    const checkIn = new Date(booking.checkIn);
    const checkOut = new Date(booking.checkOut);
    
    const startOffset = Math.max(0, (checkIn.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const duration = (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24);
    
    return {
      left: `${startOffset * (120 * zoomLevel)}px`,
      width: `${duration * (120 * zoomLevel)}px`
    };
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-500 border-blue-600';
      case 'checked-in': return 'bg-emerald-500 border-emerald-600';
      case 'checked-out': return 'bg-gray-500 border-gray-600';
      case 'cancelled': return 'bg-red-500 border-red-600';
      case 'no-show': return 'bg-orange-500 border-orange-600';
      default: return 'bg-gray-500 border-gray-600';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed': return 'Confirmed';
      case 'checked-in': return 'Checked In';
      case 'checked-out': return 'Checked Out';
      case 'cancelled': return 'Cancelled';
      case 'no-show': return 'No Show';
      default: return status;
    }
  };

  const handleBookingHover = (booking, event) => {
    setSelectedBooking(booking);
    setTooltipPosition({ x: event.clientX, y: event.clientY });
    setShowTooltip(true);
  };

  const handleBookingLeave = () => {
    setShowTooltip(false);
    setSelectedBooking(null);
  };

  const navigateDate = (direction) => {
    const newDate = new Date(currentDate);
    if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    } else {
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    }
    setCurrentDate(newDate);
  };

  const days = getDaysInRange();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Room Planner</h1>
          <p className="text-gray-600 mt-2">Visual timeline of room bookings and availability</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg">
            <Plus className="w-5 h-5" />
            <span className="font-medium">New Booking</span>
          </button>
          <button className="flex items-center space-x-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => navigateDate('prev')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="text-lg font-semibold text-gray-900 min-w-[200px] text-center">
                {viewMode === 'week' 
                  ? `Week of ${currentDate.toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' })}`
                  : currentDate.toLocaleDateString('en', { month: 'long', year: 'numeric' })
                }
              </div>
              <button
                onClick={() => navigateDate('next')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
            >
              Today
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">View:</span>
              <select
                value={viewMode}
                onChange={(e) => setViewMode(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="week">Week</option>
                <option value="month">Month</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.25))}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                disabled={zoomLevel <= 0.5}
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-sm text-gray-600 min-w-[60px] text-center">{Math.round(zoomLevel * 100)}%</span>
              <button
                onClick={() => setZoomLevel(Math.min(2, zoomLevel + 0.25))}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                disabled={zoomLevel >= 2}
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex items-center space-x-6">
          <span className="text-sm font-medium text-gray-700">Status Legend:</span>
          <div className="flex items-center space-x-1">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-xs text-gray-600">Confirmed</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-4 h-4 bg-emerald-500 rounded"></div>
            <span className="text-xs text-gray-600">Checked In</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-4 h-4 bg-gray-500 rounded"></div>
            <span className="text-xs text-gray-600">Checked Out</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-xs text-gray-600">Cancelled</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-4 h-4 bg-orange-500 rounded"></div>
            <span className="text-xs text-gray-600">No Show</span>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex">
          {/* Room List */}
          <div className="w-48 bg-gray-50 border-r border-gray-200">
            <div className="h-16 flex items-center px-4 border-b border-gray-200 bg-gray-100">
              <span className="font-semibold text-gray-900">Rooms</span>
            </div>
            {rooms.map((room) => (
              <div key={room.id} className="h-20 flex items-center px-4 border-b border-gray-200">
                <div>
                  <div className="font-medium text-gray-900">Room {room.number}</div>
                  <div className="text-sm text-gray-600">{room.type} • Floor {room.floor}</div>
                  <div className="text-xs text-gray-500">${room.price}/night</div>
                </div>
              </div>
            ))}
          </div>

          {/* Timeline Content */}
          <div className="flex-1 overflow-x-auto" ref={timelineRef}>
            <div style={{ minWidth: `${days.length * 120 * zoomLevel}px` }}>
              {/* Date Headers */}
              <div className="h-16 flex border-b border-gray-200 bg-gray-50">
                {days.map((day, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 border-r border-gray-200 flex flex-col items-center justify-center"
                    style={{ width: `${120 * zoomLevel}px` }}
                  >
                    <div className="text-xs text-gray-500">
                      {day.toLocaleDateString('en', { weekday: 'short' })}
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {day.getDate()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Room Rows */}
              {rooms.map((room) => (
                <div key={room.id} className="h-20 border-b border-gray-200 relative">
                  {/* Day Grid */}
                  {days.map((day, index) => (
                    <div
                      key={index}
                      className="absolute border-r border-gray-100 h-full"
                      style={{
                        left: `${index * 120 * zoomLevel}px`,
                        width: `${120 * zoomLevel}px`
                      }}
                    />
                  ))}

                  {/* Booking Blocks */}
                  {bookings
                    .filter(booking => booking.roomId === room.id)
                    .map((booking) => {
                      const position = getBookingPosition(booking);
                      return (
                        <div
                          key={booking.id}
                          className={`absolute top-2 bottom-2 rounded-lg border-2 cursor-pointer transition-all hover:shadow-lg hover:z-10 ${getStatusColor(booking.status)}`}
                          style={position}
                          onMouseEnter={(e) => handleBookingHover(booking, e)}
                          onMouseLeave={handleBookingLeave}
                          onMouseMove={(e) => setTooltipPosition({ x: e.clientX, y: e.clientY })}
                        >
                          <div className="p-2 text-white text-xs">
                            <div className="font-medium truncate">{booking.clientName}</div>
                            <div className="opacity-90 truncate">
                              {new Date(booking.checkIn).toLocaleDateString('en', { month: 'short', day: 'numeric' })} - 
                              {new Date(booking.checkOut).toLocaleDateString('en', { month: 'short', day: 'numeric' })}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {showTooltip && selectedBooking && (
        <div
          className="fixed z-50 bg-white rounded-lg shadow-xl border border-gray-200 p-4 max-w-sm"
          style={{
            left: tooltipPosition.x + 10,
            top: tooltipPosition.y - 10,
            transform: 'translateY(-100%)'
          }}
        >
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-gray-400" />
              <span className="font-semibold text-gray-900">{selectedBooking.clientName}</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Room:</span>
                <span className="font-medium">{selectedBooking.roomNumber}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Check-in:</span>
                <span className="font-medium">
                  {new Date(selectedBooking.checkIn).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Check-out:</span>
                <span className="font-medium">
                  {new Date(selectedBooking.checkOut).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Status:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedBooking.status)} text-white`}>
                  {getStatusText(selectedBooking.status)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total:</span>
                <span className="font-semibold text-emerald-600">
                  ${selectedBooking.totalAmount.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Payment:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  selectedBooking.paymentStatus === 'paid' ? 'bg-emerald-100 text-emerald-800' :
                  selectedBooking.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {selectedBooking.paymentStatus.charAt(0).toUpperCase() + selectedBooking.paymentStatus.slice(1)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};