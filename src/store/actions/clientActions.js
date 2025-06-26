// Client management actions
export const addClient = (client) => ({
  type: 'ADD_CLIENT',
  payload: client
});

export const deleteClient = (id) => ({
  type: 'DELETE_CLIENT',
  payload: id
});

export const updateClient = (clients) => ({
  type: 'UPDATE_CLIENT',
  payload: clients
});


// Employee management actions
export const addEmployee = (employee) => ({
  type: 'ADD_EMPLOYEE',
  payload: employee,
});

export const updateEmployee = (employee) => ({
  type: 'UPDATE_EMPLOYEE',
  payload: employee,
});

export const deleteEmployee = (id) => ({
  type: 'DELETE_EMPLOYEE',
  payload: id,
});

// Room management actions
export const addRoom = (room) => ({
  type: 'ADD_ROOM',
  payload: room,
});

export const deleteRoom = (id) => ({
  type: 'DELETE_ROOM',
  payload: id,
});

export const updateRoom = (room) => ({
  type: 'UPDATE_ROOM',
  payload: room,
});

// Room management actions
export const addBooking = (room) => ({
  type: 'ADD_BOOKING',
  payload: room,
});

export const deleteBooking = (id) => ({
  type: 'DELETE_BOOKING',
  payload: id,
});

export const updateBooking = (room) => ({
  type: 'UPDATE_BOOKING',
  payload: room,
});