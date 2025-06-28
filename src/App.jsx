import React from 'react';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { EmployeeManagement } from './components/EmployeeManagement';
import { ClientManagement } from './components/ClientManagement';
import { RoomManagement } from './components/RoomManagement';
import { InventoryManagement } from './components/InventoryManagement';
import { Reports } from './components/Reports';
import { RoomPlanner } from './components/RoomPlanner';
import { useHotelData } from './hooks/useHotelData';
import { HousekeepingManagement } from './components/housekeeping';

function App() {
  const [currentView, setCurrentView] = React.useState('dashboard');
  
  const { 
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
  } = useHotelData();

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard stats={dashboardStats} />;
      case 'employees':
        return <EmployeeManagement employees={employees} setEmployees={setEmployees} />;
      case 'clients':
        return <ClientManagement clients={clients} setClients={setClients} />;
      case 'rooms':
        return <RoomManagement rooms={rooms} setRooms={setRooms} />;
      case 'inventory':
        return <InventoryManagement inventory={inventory} setInventory={setInventory} />;
      case 'roomplanner':
        return <RoomPlanner rooms={rooms} bookings={bookings} />;
      case 'housekeeping':
        return <HousekeepingManagement rooms={rooms} setRooms={setRooms} />;  
      case 'reports':
        return <Reports stats={dashboardStats} />;
      default:
        return <Dashboard stats={dashboardStats} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentView={currentView} onViewChange={setCurrentView} />
      <div className="ml-64 min-h-screen">
        <main className="p-8">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            renderCurrentView()
          )}
        </main>
      </div>
    </div>
  );
}

export default App;