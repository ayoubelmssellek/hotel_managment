import { useState, useEffect } from 'react';

// Mock data
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
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@hotel.com',
    phone: '+1 (555) 234-5678',
    role: 'receptionist',
    department: 'Front Desk',
    salary: 45000,
    hireDate: '2023-03-10',
    status: 'active',
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@hotel.com',
    phone: '+1 (555) 345-6789',
    role: 'housekeeping',
    department: 'Housekeeping',
    salary: 35000,
    hireDate: '2023-06-20',
    status: 'active',
  },
  {
    id: '4',
    name: 'David Thompson',
    email: 'david.thompson@hotel.com',
    phone: '+1 (555) 456-7890',
    role: 'maintenance',
    department: 'Maintenance',
    salary: 40000,
    hireDate: '2022-09-05',
    status: 'on-leave',
  },
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
  {
    id: '2',
    name: 'Emma Wilson',
    email: 'emma.wilson@email.com',
    phone: '+1 (555) 876-5432',
    address: '456 Oak Ave, Los Angeles, CA 90210',
    nationality: 'American',
    idNumber: 'P987654321',
    vipStatus: 'platinum',
    totalBookings: 25,
    totalSpent: 58000,
    lastVisit: '2024-01-20',
  },
  {
    id: '3',
    name: 'James Brown',
    email: 'james.brown@email.com',
    phone: '+1 (555) 765-4321',
    address: '789 Pine St, Chicago, IL 60601',
    nationality: 'American',
    idNumber: 'P456789123',
    vipStatus: 'silver',
    totalBookings: 8,
    totalSpent: 15200,
    lastVisit: '2024-01-10',
  },
];

const mockRooms = [
  {
    id: '1',
    number: '101',
    type: 'single',
    floor: 1,
    price: 120,
    status: 'occupied',
    amenities: ['WiFi', 'TV', 'AC', 'Mini Bar'],
    lastCleaned: '2024-01-20',
    currentGuest: 'John Smith',
    checkIn: '2024-01-20',
    checkOut: '2024-01-23',
  },
  {
    id: '2',
    number: '102',
    type: 'double',
    floor: 1,
    price: 180,
    status: 'available',
    amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Balcony'],
    lastCleaned: '2024-01-21',
  },
  {
    id: '3',
    number: '201',
    type: 'suite',
    floor: 2,
    price: 350,
    status: 'occupied',
    amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Balcony', 'Jacuzzi', 'Kitchen'],
    lastCleaned: '2024-01-19',
    currentGuest: 'Emma Wilson',
    checkIn: '2024-01-19',
    checkOut: '2024-01-25',
  },
  {
    id: '4',
    number: '202',
    type: 'deluxe',
    floor: 2,
    price: 280,
    status: 'maintenance',
    amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Balcony', 'Jacuzzi'],
    lastCleaned: '2024-01-18',
  },
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
  {
    id: '2',
    name: 'Towels',
    category: 'linens',
    currentStock: 200,
    minStock: 150,
    maxStock: 400,
    unit: 'pieces',
    unitPrice: 25,
    supplier: 'Luxury Linens Co.',
    lastRestocked: '2024-01-15',
  },
  {
    id: '3',
    name: 'Shampoo',
    category: 'toiletries',
    currentStock: 50,
    minStock: 75,
    maxStock: 200,
    unit: 'bottles',
    unitPrice: 8,
    supplier: 'Hotel Supplies Inc.',
    lastRestocked: '2024-01-10',
  },
  {
    id: '4',
    name: 'Cleaning Supplies',
    category: 'cleaning',
    currentStock: 80,
    minStock: 50,
    maxStock: 150,
    unit: 'units',
    unitPrice: 15,
    supplier: 'Clean Pro Solutions',
    lastRestocked: '2024-01-18',
  },
];

const mockDashboardStats = {
  totalRevenue: 125000,
  occupancyRate: 78,
  totalGuests: 45,
  availableRooms: 12,
  totalEmployees: 28,
  monthlyRevenue: [95000, 108000, 125000, 142000, 135000, 155000],
  recentBookings: [],
};

export const useHotelData = () => {
  const [employees, setEmployees] = useState(mockEmployees);
  const [clients, setClients] = useState(mockClients);
  const [rooms, setRooms] = useState(mockRooms);
  const [inventory, setInventory] = useState(mockInventory);
  const [dashboardStats, setDashboardStats] = useState(mockDashboardStats);
  const [loading, setLoading] = useState(false);

  // Simulated API calls
  const refreshData = async () => {
    setLoading(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  };

  return {
    employees,
    clients,
    rooms,
    inventory,
    dashboardStats,
    loading,
    refreshData,
    setEmployees,
    setClients,
    setRooms,
    setInventory,
  };
};