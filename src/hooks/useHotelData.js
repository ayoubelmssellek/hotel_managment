import { useState } from 'react';

const mockRooms = [
  {
    id: '1',
    number: '101',
    type: 'single',
    floor: 1,
    price: 120,
    status: 'occupied',
    amenities: ['WiFi', 'TV', 'AC', 'Mini Bar'],
    lastCleaned: '2025-06-20',
    currentGuest: 'John Smith',
    checkIn: '2025-06-20',
    checkOut: '2025-06-23',
  },
  {
    id: '2',
    number: '102',
    type: 'double',
    floor: 1,
    price: 180,
    status: 'available',
    amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Balcony'],
    lastCleaned: '2025-06-21',
  },
  {
    id: '3',
    number: '201',
    type: 'suite',
    floor: 2,
    price: 350,
    status: 'occupied',
    amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Balcony', 'Jacuzzi', 'Kitchen'],
    lastCleaned: '2025-06-19',
    currentGuest: 'Emma Wilson',
    checkIn: '2025-06-19',
    checkOut: '2025-06-25',
  },
  {
    id: '4',
    number: '202',
    type: 'deluxe',
    floor: 2,
    price: 280,
    status: 'maintenance',
    amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Balcony', 'Jacuzzi'],
    lastCleaned: '2025-06-18',
  },
];

const mockBookings = [
  {
    id: 'b1',
    clientName: 'John Smith',
    roomId: '1',
    roomNumber: '101',
    checkIn: '2025-06-20',
    checkOut: '2025-06-23',
    status: 'checked-in',
    paymentStatus: 'paid',
    totalAmount: 360,
  },
  {
    id: 'b2',
    clientName: 'Emma Wilson',
    roomId: '3',
    roomNumber: '201',
    checkIn: '2025-06-19',
    checkOut: '2025-06-25',
    status: 'checked-in',
    paymentStatus: 'paid',
    totalAmount: 2100,
  },
  {
    id: 'b3',
    clientName: 'James Brown',
    roomId: '2',
    roomNumber: '102',
    checkIn: '2025-07-01',
    checkOut: '2025-07-05',
    status: 'confirmed',
    paymentStatus: 'pending',
    totalAmount: 720,
  },
];

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