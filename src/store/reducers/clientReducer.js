const initialState = {
  listClient: [
    {
      id: 1,
      name: "Mohamed El Amrani",
      phone: "+212612345678",
      nationality: "Moroccan",
      vipStatus: "gold",   // ممكن تكون Gold, Silver, Bronze, أو None
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
      status: "active", // active, inactive, on-leave
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
    listRoom: [
    {
      id: 1,
      number: '101',
      floor: 1,
      type: 'single',
      status: 'available',
      price: 80,
      amenities: ['wifi', 'tv', ],
      lastCleaned: new Date(),
      currentGuest: '',
      checkIn: new Date(),
      checkOut: new Date(new Date().getTime() + 86400000),
    },
    {
      id: 2,
      number: '102',
      floor: 1,
      type: 'double',
      status: 'occupied',
      price: 120,
      amenities: ['wifi','tv', 'balcony'],
      lastCleaned: new Date(),
      currentGuest: 'Fatima Zahra',
      checkIn: new Date(),
      checkOut: new Date(new Date().getTime() + 172800000),
    },
        {
      id: 3,
      number: '105',
      floor: 2,
      type: 'Suite',
      status: 'available',
      price: 80,
      amenities: ['wifi', 'tv'],
      lastCleaned: new Date(),
      currentGuest: '',
      checkIn: new Date(),
      checkOut: new Date(new Date().getTime() + 86400000),
    },
    {
      id: 4,
      number: '201',
      floor: 2,
      type: 'deluxe',
      status: 'available',
      price: 180,
      amenities: ['wifi', 'tv', 'balcony', 'jacuzzi'],
      lastCleaned: new Date(),
      currentGuest: '',
      checkIn: null,
      checkOut: null,
    },
    {
      id: 5,
      number: '202',
      floor: 2,
      type: 'double',
      status: 'maintenance',
      price: 70,
      amenities: ['tv'],
      lastCleaned: new Date(new Date().getTime() - 3 * 86400000), // cleaned 3 days ago
      currentGuest: '',
      checkIn: null,
      checkOut: null,
    },
    {
      id: 6,
      number: '301',
      floor: 3,
      type: 'single',
      status: 'Cleaning',
      price: 90,
      amenities: ['wifi', 'tv', 'jacuzzi'],
      lastCleaned: new Date(),
      currentGuest: '',
      checkIn: null ,
      checkOut: null
    },
  ]
};



export default function clientReducer(state = initialState, action) {
  switch (action.type) {
    // Action types for client management
    case 'ADD_CLIENT':
      return { ...state, listClient: [...state.listClient, action.payload] };
    case 'DELETE_CLIENT':
      return { ...state, listClient: state.listClient.filter(c => c.id !== action.payload) };
    case 'UPDATE_CLIENT':
       return {
    ...state,
    listClient: state.listClient.map(c =>
      c.id === action.payload.id ? action.payload : c
    )
   };
    // Action types for employee management
    case 'ADD_EMPLOYEE':
      return { ...state, listEmployee: [...state.listEmployee, action.payload] };
    case 'UPDATE_EMPLOYEE':
      return {
        ...state,
        listEmployee: state.listEmployee.map(emp =>
          emp.id === action.payload.id ? action.payload : emp
        )
      };
    case 'DELETE_EMPLOYEE':
      return {
        ...state,
        listEmployee: state.listEmployee.filter(emp => emp.id !== action.payload)
      };


    // Action types for room management
    case 'ADD_ROOM':
      return { ...state, listRoom: [...state.listRoom, action.payload] };
    case 'DELETE_ROOM':
      return { ...state, listRoom: state.listRoom.filter(r => r.id !== action.payload) };
    case 'UPDATE_ROOM':
      return {
        ...state,
        listRoom: state.listRoom.map(room =>
          room.id === action.payload.id ? action.payload : room
        )
      };
    default:
      return state;
  }
}
