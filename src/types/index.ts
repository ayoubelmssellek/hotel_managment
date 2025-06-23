export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'manager' | 'receptionist' | 'housekeeping' | 'maintenance' | 'security';
  department: string;
  salary: number;
  hireDate: string;
  status: 'active' | 'inactive' | 'on-leave';
  avatar?: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  nationality: string;
  idNumber: string;
  vipStatus: 'regular' | 'silver' | 'gold' | 'platinum';
  totalBookings: number;
  totalSpent: number;
  lastVisit: string;
  avatar?: string;
}

export interface Room {
  id: string;
  number: string;
  type: 'single' | 'double' | 'suite' | 'deluxe' | 'presidential';
  floor: number;
  price: number;
  status: 'available' | 'occupied' | 'maintenance' | 'cleaning';
  amenities: string[];
  lastCleaned: string;
  currentGuest?: string;
  checkIn?: string;
  checkOut?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'linens' | 'toiletries' | 'food' | 'cleaning' | 'maintenance' | 'electronics';
  currentStock: number;
  minStock: number;
  maxStock: number;
  unit: string;
  unitPrice: number;
  supplier: string;
  lastRestocked: string;
}

export interface Booking {
  id: string;
  clientId: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  status: 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled';
  totalAmount: number;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  specialRequests?: string;
}

export interface DashboardStats {
  totalRevenue: number;
  occupancyRate: number;
  totalGuests: number;
  availableRooms: number;
  totalEmployees: number;
  monthlyRevenue: number[];
  recentBookings: Booking[];
}