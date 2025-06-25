import { useState } from 'react';

const mockRooms = [
  { id: '1', number: '101', type: 'single', floor: 1, price: 120, status: 'occupied', amenities: ['WiFi', 'TV', 'AC', 'Mini Bar'], lastCleaned: '2025-06-20' },
  { id: '2', number: '102', type: 'double', floor: 1, price: 180, status: 'available', amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Balcony'], lastCleaned: '2025-06-21' },
  { id: '3', number: '201', type: 'suite', floor: 2, price: 350, status: 'occupied', amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Balcony', 'Jacuzzi', 'Kitchen'], lastCleaned: '2025-06-19' },
  { id: '4', number: '202', type: 'deluxe', floor: 2, price: 280, status: 'maintenance', amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Balcony', 'Jacuzzi'], lastCleaned: '2025-06-18' },
  { id: '5', number: '103', type: 'single', floor: 1, price: 130, status: 'available', amenities: ['WiFi', 'TV'], lastCleaned: '2025-06-20' },
  { id: '6', number: '203', type: 'suite', floor: 2, price: 370, status: 'available', amenities: ['WiFi', 'TV', 'AC'], lastCleaned: '2025-06-22' },
  { id: '7', number: '104', type: 'double', floor: 1, price: 190, status: 'available', amenities: ['TV', 'AC'], lastCleaned: '2025-06-23' },
  { id: '8', number: '204', type: 'deluxe', floor: 2, price: 290, status: 'occupied', amenities: ['WiFi', 'AC'], lastCleaned: '2025-06-24' },
  { id: '9', number: '105', type: 'single', floor: 1, price: 140, status: 'available', amenities: ['WiFi'], lastCleaned: '2025-06-25' },
  { id: '10', number: '205', type: 'suite', floor: 2, price: 390, status: 'maintenance', amenities: ['TV', 'Mini Bar'], lastCleaned: '2025-06-26' },
];

const mockBookings = [
  { id: 'b1', clientName: 'John Smith', roomId: '1', roomNumber: '101', checkIn: '2025-06-20', checkOut: '2025-06-23', status: 'checked-in', paymentStatus: 'paid', totalAmount: 360 },
  { id: 'b2', clientName: 'Emma Wilson', roomId: '3', roomNumber: '201', checkIn: '2025-06-19', checkOut: '2025-06-25', status: 'checked-in', paymentStatus: 'paid', totalAmount: 2100 },
  { id: 'b3', clientName: 'Liam Johnson', roomId: '4', roomNumber: '202', checkIn: '2025-06-10', checkOut: '2025-06-15', status: 'checked-out', paymentStatus: 'paid', totalAmount: 1400 },
  { id: 'b4', clientName: 'Noah Davis', roomId: '5', roomNumber: '103', checkIn: '2025-06-05', checkOut: '2025-06-07', status: 'checked-out', paymentStatus: 'paid', totalAmount: 260 },
  { id: 'b5', clientName: 'Olivia Taylor', roomId: '6', roomNumber: '203', checkIn: '2025-06-12', checkOut: '2025-06-18', status: 'checked-in', paymentStatus: 'paid', totalAmount: 2220 },
  { id: 'b6', clientName: 'Sophia Martinez', roomId: '7', roomNumber: '104', checkIn: '2025-06-08', checkOut: '2025-06-10', status: 'checked-out', paymentStatus: 'paid', totalAmount: 380 },
  { id: 'b7', clientName: 'Isabella Hernandez', roomId: '8', roomNumber: '204', checkIn: '2025-06-14', checkOut: '2025-06-16', status: 'checked-out', paymentStatus: 'paid', totalAmount: 580 },
  { id: 'b8', clientName: 'Mason Lee', roomId: '9', roomNumber: '105', checkIn: '2025-06-21', checkOut: '2025-06-24', status: 'checked-in', paymentStatus: 'paid', totalAmount: 420 },
  { id: 'b9', clientName: 'Ethan White', roomId: '10', roomNumber: '205', checkIn: '2025-06-25', checkOut: '2025-06-28', status: 'confirmed', paymentStatus: 'pending', totalAmount: 1170 },
  { id: 'b10', clientName: 'Ava Thompson', roomId: '2', roomNumber: '102', checkIn: '2025-06-26', checkOut: '2025-06-30', status: 'confirmed', paymentStatus: 'pending', totalAmount: 900 },
    { id: 'b11', clientName: 'James Brown', roomId: '2', roomNumber: '102', checkIn: '2025-07-01', checkOut: '2025-07-05', status: 'confirmed', paymentStatus: 'pending', totalAmount: 720 },
  { id: 'b12', clientName: 'Emily Moore', roomId: '3', roomNumber: '201', checkIn: '2025-07-03', checkOut: '2025-07-07', status: 'confirmed', paymentStatus: 'pending', totalAmount: 1400 },
  { id: 'b13', clientName: 'Benjamin Martin', roomId: '4', roomNumber: '202', checkIn: '2025-07-05', checkOut: '2025-07-09', status: 'confirmed', paymentStatus: 'pending', totalAmount: 1120 },
  { id: 'b14', clientName: 'Charlotte Garcia', roomId: '5', roomNumber: '103', checkIn: '2025-07-06', checkOut: '2025-07-10', status: 'confirmed', paymentStatus: 'paid', totalAmount: 520 },
  { id: 'b15', clientName: 'Amelia Rodriguez', roomId: '6', roomNumber: '203', checkIn: '2025-07-10', checkOut: '2025-07-15', status: 'confirmed', paymentStatus: 'pending', totalAmount: 1850 },
  { id: 'b16', clientName: 'Logan Lewis', roomId: '7', roomNumber: '104', checkIn: '2025-07-11', checkOut: '2025-07-14', status: 'confirmed', paymentStatus: 'pending', totalAmount: 570 },
  { id: 'b17', clientName: 'Mia Walker', roomId: '8', roomNumber: '204', checkIn: '2025-07-13', checkOut: '2025-07-16', status: 'confirmed', paymentStatus: 'pending', totalAmount: 870 },
  { id: 'b18', clientName: 'Harper Hall', roomId: '9', roomNumber: '105', checkIn: '2025-07-15', checkOut: '2025-07-18', status: 'confirmed', paymentStatus: 'paid', totalAmount: 420 },
  { id: 'b19', clientName: 'Evelyn Allen', roomId: '10', roomNumber: '205', checkIn: '2025-07-17', checkOut: '2025-07-20', status: 'confirmed', paymentStatus: 'paid', totalAmount: 1170 },
  { id: 'b20', clientName: 'Lucas Young', roomId: '1', roomNumber: '101', checkIn: '2025-07-19', checkOut: '2025-07-23', status: 'confirmed', paymentStatus: 'pending', totalAmount: 600 },


]

const mockEmployees = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@hotel.com',
    phone: '+1 (555) 123-4567',
    role: 'manager',
    department: 'Administration',
    salary: 75000,
    hireDate: '2022-01-15',
    status: 'active',
  },
  // ... other employees
];

const mockClients = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 987-6543',
    address: '123 Main St, New York, NY 10001',
    nationality: 'American',
    idNumber: 'P123456789',
    vipStatus: 'gold',
    totalBookings: 12,
    totalSpent: 24500,
    lastVisit: '2024-01-15',
  },
  // ... other clients
];

const mockInventory = [
  {
    id: '1',
    name: 'Bed Sheets',
    category: 'linens',
    currentStock: 150,
    minStock: 100,
    maxStock: 300,
    unit: 'sets',
    unitPrice: 45,
    supplier: 'Luxury Linens Co.',
    lastRestocked: '2024-01-15',
  },
  // ... other inventory items
];

const mockDashboardStats = {
  totalRevenue: 125000,
  occupancyRate: 78,
  totalGuests: 45,
  availableRooms: 12,
  totalEmployees: 28,
  monthlyRevenue: [95000, 108000, 125000, 142000, 135000, 155000],
  recentBookings: mockBookings,
};

export const useHotelData = () => {
  const [employees, setEmployees] = useState(mockEmployees);
  const [clients, setClients] = useState(mockClients);
  const [rooms, setRooms] = useState(mockRooms);
  const [inventory, setInventory] = useState(mockInventory);
  const [bookings, setBookings] = useState(mockBookings);
  const [dashboardStats, setDashboardStats] = useState(mockDashboardStats);
  const [loading, setLoading] = useState(false);

  const refreshData = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  };

  return {
    employees,
    clients,
    rooms,
    inventory,
    bookings,
    dashboardStats,
    loading,
    refreshData,
    setEmployees,
    setClients,
    setRooms,
    setInventory,
    setBookings,
    setDashboardStats,
  };
};