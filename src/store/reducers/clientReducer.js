const initialState = {
  listClient: [
    {
      id: 1,
      name: "Mohamed El Amrani",
      phone: "+212612345678",
      nationality: "Moroccan",
      vipStatus: "gold",
      totalBookings: 5,
      totalSpent: 1250,
      room: "101",
    },
    {
      id: 2,
      name: "Sara Benjelloun",
      phone: "+212698765432",
      nationality: "Moroccan",
      vipStatus: "silver",
      totalBookings: 2,
      totalSpent: 500,
      room: "203",
    },
    {
      id: 3,
      name: "Youssef Idrissi",
      phone: "+212600112233",
      nationality: "Moroccan",
      vipStatus: "regular",
      totalBookings: 1,
      totalSpent: 250,
      room: "305",
    },
  ],

  listEmployee: [
    {
      id: 1,
      name: "Fatima Zahra",
      phone: "+212655443322",
      role: "manager",
      department: "Management",
      status: "active",
      salary: 75000,
      hireDate: "2021-03-12",
    },
    {
      id: 2,
      name: "Ahmed Ouazzani",
      phone: "+212698765123",
      role: "receptionist",
      department: "Front Desk",
      status: "on-leave",
      salary: 40000,
      hireDate: "2022-07-22",
    },
    {
      id: 3,
      name: "Nadia El Mansouri",
      phone: "+212612334455",
      role: "housekeeping",
      department: "Housekeeping",
      status: "active",
      salary: 35000,
      hireDate: "2020-12-05",
    },
    {
      id: 4,
      name: "Omar Benali",
      phone: "+212600998877",
      role: "maintenance",
      department: "Maintenance",
      status: "inactive",
      salary: 42000,
      hireDate: "2019-10-11",
    },
  ],

  listRoom : [
  {
    id: 1,
    number: "101",
    floor: 1,
    type: "single",
    status: "available",
    price: 80,
    amenities: ["wifi", "tv"],
    lastCleaned: new Date(),
    currentGuest: "",
    checkIn: new Date(),
    checkOut: new Date(new Date().getTime() + 86400000),
  },
  {
    id: 2,
    number: "102",
    floor: 1,
    type: "double",
    status: "occupied",
    price: 120,
    amenities: ["wifi", "tv", "balcony"],
    lastCleaned: new Date(),
    currentGuest: "Fatima Zahra",
    checkIn: new Date(),
    checkOut: new Date(new Date().getTime() + 172800000),
  },
  {
    id: 3,
    number: "105",
    floor: 2,
    type: "suite",
    status: "available",
    price: 180,
    amenities: ["wifi", "tv"],
    lastCleaned: new Date(),
    currentGuest: "",
    checkIn: new Date(),
    checkOut: new Date(new Date().getTime() + 86400000),
  },
  {
    id: 4,
    number: "201",
    floor: 2,
    type: "deluxe",
    status: "available",
    price: 180,
    amenities: ["wifi", "tv", "balcony", "jacuzzi"],
    lastCleaned: new Date(),
    currentGuest: "",
    checkIn: null,
    checkOut: null,
  },
  {
    id: 5,
    number: "202",
    floor: 2,
    type: "double",
    status: "maintenance",
    price: 70,
    amenities: ["tv"],
    lastCleaned: new Date(new Date().getTime() - 3 * 86400000),
    currentGuest: "",
    checkIn: null,
    checkOut: null,
  },
  {
    id: 6,
    number: "301",
    floor: 3,
    type: "single",
    status: "cleaning",
    price: 90,
    amenities: ["wifi", "tv", "jacuzzi"],
    lastCleaned: new Date(),
    currentGuest: "",
    checkIn: null,
    checkOut: null,
  },
  {
    id: 7,
    number: "302",
    floor: 3,
    type: "double",
    status: "available",
    price: 110,
    amenities: ["wifi", "balcony"],
    lastCleaned: new Date(),
    currentGuest: "",
    checkIn: null,
    checkOut: null,
  },
  {
    id: 8,
    number: "303",
    floor: 3,
    type: "suite",
    status: "occupied",
    price: 200,
    amenities: ["wifi", "tv", "balcony", "kitchen"],
    lastCleaned: new Date(),
    currentGuest: "Youssef Ait",
    checkIn: new Date("2025-07-01"),
    checkOut: new Date("2025-07-05"),
  },
  {
    id: 9,
    number: "304",
    floor: 3,
    type: "deluxe",
    status: "available",
    price: 160,
    amenities: ["tv", "jacuzzi"],
    lastCleaned: new Date(),
    currentGuest: "",
    checkIn: null,
    checkOut: null,
  },
  {
    id: 10,
    number: "305",
    floor: 3,
    type: "single",
    status: "available",
    price: 85,
    amenities: ["wifi"],
    lastCleaned: new Date(),
    currentGuest: "",
    checkIn: null,
    checkOut: null,
  },
],

  mockBookings : [
  {
    id: "b1",
    clientName: "John Smith",
    roomId: 1,
    roomNumber: "101",
    checkIn: "2025-06-20",
    checkOut: "2025-06-23",
    status: "checked-out",
    paymentStatus: "paid",
    totalAmount: 360,
  },
  {
    id: "b2",
    clientName: "Emma Wilson",
    roomId: 4,
    roomNumber: "201",
    checkIn: "2025-06-19",
    checkOut: "2025-06-25",
    status: "checked-in",
    paymentStatus: "paid",
    totalAmount: 2100,
  },
  {
    id: "b3",
    clientName: "James Brown",
    roomId: 2,
    roomNumber: "102",
    checkIn: "2025-07-01",
    checkOut: "2025-07-05",
    status: "confirmed",
    paymentStatus: "pending",
    totalAmount: 720,
  },

  // --- حجوزات إضافية في يونيو ---
  {
    id: "b4",
    clientName: "Ali Ben",
    roomId: 3,
    roomNumber: "105",
    checkIn: "2025-06-10",
    checkOut: "2025-06-13",
    status: "checked-out",
    paymentStatus: "paid",
    totalAmount: 540,
  },
  {
    id: "b5",
    clientName: "Zahra Haddou",
    roomId: 5,
    roomNumber: "202",
    checkIn: "2025-06-15",
    checkOut: "2025-06-18",
    status: "checked-out",
    paymentStatus: "paid",
    totalAmount: 420,
  },
  {
    id: "b6",
    clientName: "Khalid Omar",
    roomId: 6,
    roomNumber: "301",
    checkIn: "2025-06-08",
    checkOut: "2025-06-10",
    status: "checked-out",
    paymentStatus: "paid",
    totalAmount: 180,
  },
  {
    id: "b7",
    clientName: "Nora Lamsa",
    roomId: 7,
    roomNumber: "302",
    checkIn: "2025-06-22",
    checkOut: "2025-06-25",
    status: "checked-out",
    paymentStatus: "paid",
    totalAmount: 330,
  },
  {
    id: "b8",
    clientName: "Yassine Rami",
    roomId: 10,
    roomNumber: "305",
    checkIn: "2025-06-27",
    checkOut: "2025-06-30",
    status: "confirmed",
    paymentStatus: "pending",
    totalAmount: 255,
  },

  // --- حجوزات إضافية في يوليو ---
  {
    id: "b9",
    clientName: "Lina Sara",
    roomId: 3,
    roomNumber: "105",
    checkIn: "2025-07-02",
    checkOut: "2025-07-05",
    status: "confirmed",
    paymentStatus: "pending",
    totalAmount: 420,
  },
  {
    id: "b10",
    clientName: "Hamza Badr",
    roomId: 6,
    roomNumber: "301",
    checkIn: "2025-07-04",
    checkOut: "2025-07-07",
    status: "confirmed",
    paymentStatus: "paid",
    totalAmount: 270,
  },
  {
    id: "b11",
    clientName: "Soukaina Azouz",
    roomId: 8,
    roomNumber: "303",
    checkIn: "2025-07-08",
    checkOut: "2025-07-12",
    status: "confirmed",
    paymentStatus: "pending",
    totalAmount: 800,
  },
  {
    id: "b12",
    clientName: "Tariq Najib",
    roomId: 9,
    roomNumber: "304",
    checkIn: "2025-07-13",
    checkOut: "2025-07-16",
    status: "confirmed",
    paymentStatus: "pending",
    totalAmount: 480,
  },
  {
    id: "b13",
    clientName: "Layla Abid",
    roomId: 10,
    roomNumber: "305",
    checkIn: "2025-07-17",
    checkOut: "2025-07-20",
    status: "confirmed",
    paymentStatus: "paid",
    totalAmount: 255,
  },
]

};

export default function clientReducer(state = initialState, action) {
  switch (action.type) {
    // Clients
    case "ADD_CLIENT":
      return { ...state, listClient: [...state.listClient, action.payload] };
    case "DELETE_CLIENT":
      return { ...state, listClient: state.listClient.filter(c => c.id !== action.payload) };
    case "UPDATE_CLIENT":
      return {
        ...state,
        listClient: state.listClient.map(c =>
          c.id === action.payload.id ? action.payload : c
        ),
      };

    // Employees
    case "ADD_EMPLOYEE":
      return { ...state, listEmployee: [...state.listEmployee, action.payload] };
    case "UPDATE_EMPLOYEE":
      return {
        ...state,
        listEmployee: state.listEmployee.map(emp =>
          emp.id === action.payload.id ? action.payload : emp
        ),
      };
    case "DELETE_EMPLOYEE":
      return {
        ...state,
        listEmployee: state.listEmployee.filter(emp => emp.id !== action.payload),
      };

    // Rooms
    case "ADD_ROOM":
      return { ...state, listRoom: [...state.listRoom, action.payload] };
    case "UPDATE_ROOM":
      return {
        ...state,
        listRoom: state.listRoom.map(room =>
          room.id === action.payload.id ? action.payload : room
        ),
      };
    case "DELETE_ROOM":
      return {
        ...state,
        listRoom: state.listRoom.filter(room => room.id !== action.payload),
      };

    // Bookings
    case "ADD_BOOKING":
      return { ...state, mockBookings: [...state.mockBookings, action.payload] };
    case "UPDATE_BOOKING":
      return {
        ...state,
        mockBookings: state.mockBookings.map(b =>
          b.id === action.payload.id ? action.payload : b
        ),
      };
    case "DELETE_BOOKING":
      return {
        ...state,
        mockBookings: state.mockBookings.filter(b => b.id !== action.payload),
      };

    default:
      return state;
  }
}
