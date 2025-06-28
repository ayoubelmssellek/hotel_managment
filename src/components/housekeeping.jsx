import React, { useState, useEffect } from 'react';
import { 
  Plus, Search, Filter, CheckCircle, XCircle, Clock, User, Calendar,
  MapPin, AlertCircle, RefreshCw, Users, ClipboardList, Zap, MessageSquare,
  Edit3, Eye, Trash2, ChevronDown, ChevronUp
} from 'lucide-react';
import { useSelector } from 'react-redux';

export const HousekeepingManagement = () => {
  const employees = useSelector((state) => state.listEmployee);
  const rooms = useSelector((state) => state.listRoom);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterStaff, setFilterStaff] = useState('all');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [expandedTask, setExpandedTask] = useState(null);

  // Housekeeping tasks state
  const [tasks, setTasks] = useState([
    {
      id: '1',
      roomId: 1,
      assignedTo: 5,
      status: 'completed',
      priority: 'high',
      taskType: 'checkout-cleaning',
      estimatedTime: 45,
      startTime: '09:00',
      completedTime: '09:42',
      checkoutTime: '08:30',
      nextCheckinTime: '15:00',
      notes: 'Room cleaned and inspected. Ready for next guest.',
    },
    {
      id: '2',
      roomId: 2,
      assignedTo: 5,
      status: 'in-progress',
      priority: 'medium',
      taskType: 'checkout-cleaning',
      estimatedTime: 45,
      startTime: '10:15',
      checkoutTime: '09:45',
      nextCheckinTime: '16:00',
      guestRequests: ['Extra towels', 'Late checkout'],
    },
    {
      id: '3',
      roomId: 5,
      assignedTo: 6,
      status: 'pending',
      priority: 'urgent',
      taskType: 'maintenance-cleaning',
      estimatedTime: 90,
      notes: 'Deep cleaning required after maintenance work',
    },
    
  ]);

  const housekeepingStaff = employees.filter(emp => emp.role === 'housekeeping');

  // Find room by ID
  const findRoom = (roomId) => rooms.find(room => room.id === roomId);

  // Find employee by ID
  const findEmployee = (empId) => employees.find(emp => emp.id === empId);

  // Toggle task details
  const toggleTaskDetails = (taskId) => {
    setExpandedTask(expandedTask === taskId ? null : taskId);
  };

  // Filter tasks based on search and filters
  const filteredTasks = tasks.filter(task => {
    const room = findRoom(task.roomId);
    const employee = findEmployee(task.assignedTo);
    const roomNumber = room ? room.number : '';
    const employeeName = employee ? employee.name : '';
    
    const matchesSearch = roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employeeName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesStaff = filterStaff === 'all' || task.assignedTo === parseInt(filterStaff);
    
    return matchesSearch && matchesStatus && matchesStaff;
  });

  // Status styling helpers
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'pending': return 'bg-red-100 text-red-800 border-red-200';
      case 'inspection': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'in-progress': return <Clock className="w-4 h-4" />;
      case 'pending': return <XCircle className="w-4 h-4" />;
      case 'inspection': return <Eye className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getTaskTypeIcon = (taskType) => {
    switch (taskType) {
      case 'checkout-cleaning': return <RefreshCw className="w-4 h-4" />;
      case 'maintenance-cleaning': return <AlertCircle className="w-4 h-4" />;
      case 'deep-cleaning': return <Zap className="w-4 h-4" />;
      case 'inspection': return <Eye className="w-4 h-4" />;
      case 'guest-request': return <MessageSquare className="w-4 h-4" />;
      default: return <ClipboardList className="w-4 h-4" />;
    }
  };

  // Update task status
  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { 
            ...task, 
            status: newStatus,
            completedTime: newStatus === 'completed' ? new Date().toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' }) : task.completedTime,
            startTime: newStatus === 'in-progress' && !task.startTime ? new Date().toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' }) : task.startTime
          }
        : task
    ));
  };

  // Delete task
  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Add new task
  const addTask = (newTask) => {
    setTasks([...tasks, {
      ...newTask,
      id: Date.now().toString(),
      status: 'pending',
      startTime: null,
      completedTime: null,
      guestRequests: [],
      checkoutTime: null,
      nextCheckinTime: null,
    }]);
  };

  // Update existing task
  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
  };

  // Auto-assign tasks to staff
  const autoAssignTasks = () => {
    const pendingTasks = tasks.filter(task => task.status === 'pending');
    if (pendingTasks.length === 0 || housekeepingStaff.length === 0) return;

    const updatedTasks = [...tasks];
    const staffAssignments = {};
    
    pendingTasks.forEach(task => {
      // Find staff with least tasks
      let minTasks = Infinity;
      let selectedStaff = null;
      
      housekeepingStaff.forEach(staff => {
        const staffTasks = tasks.filter(t => t.assignedTo === staff.id && t.status !== 'completed').length;
        if (staffTasks < minTasks) {
          minTasks = staffTasks;
          selectedStaff = staff.id;
        }
      });
      
      if (selectedStaff !== null) {
        const taskIndex = updatedTasks.findIndex(t => t.id === task.id);
        if (taskIndex !== -1) {
          updatedTasks[taskIndex] = {
            ...updatedTasks[taskIndex],
            assignedTo: selectedStaff
          };
          staffAssignments[task.id] = selectedStaff;
        }
      }
    });
    
    setTasks(updatedTasks);
  };

  // Get statistics
  const getStatsData = () => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const inProgressTasks = tasks.filter(t => t.status === 'in-progress').length;
    const pendingTasks = tasks.filter(t => t.status === 'pending').length;
    const urgentTasks = tasks.filter(t => t.priority === 'urgent').length;

    return {
      totalTasks,
      completedTasks,
      inProgressTasks,
      pendingTasks,
      urgentTasks,
      completionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
    };
  };

  const stats = getStatsData();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Housekeeping Management</h1>
          <p className="text-gray-600 mt-2">Manage room cleaning schedules and staff assignments</p>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => {
              setSelectedTask(null);
              setShowTaskModal(true);
            }}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">Add Task</span>
          </button>
          <button 
            onClick={autoAssignTasks}
            className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg"
          >
            <RefreshCw className="w-5 h-5" />
            <span className="font-medium">Auto-Assign</span>
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search rooms or staff..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="inspection">Inspection</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-gray-400" />
              <select
                value={filterStaff}
                onChange={(e) => setFilterStaff(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Staff</option>
                {housekeepingStaff.map((staff) => (
                  <option key={staff.id} value={staff.id}>{staff.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <ClipboardList className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.totalTasks}</p>
              <p className="text-sm text-gray-600">Total Tasks</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.completedTasks}</p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.inProgressTasks}</p>
              <p className="text-sm text-gray-600">In Progress</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.pendingTasks}</p>
              <p className="text-sm text-gray-600">Pending</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.urgentTasks}</p>
              <p className="text-sm text-gray-600">Urgent</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.completionRate}%</p>
              <p className="text-sm text-gray-600">Completion Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Staff Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Today's Cleaning Schedule</h3>
          <div className="space-y-4">
            {filteredTasks.map((task) => {
              const room = findRoom(task.roomId);
              const staff = findEmployee(task.assignedTo);
              
              return (
                <div key={task.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => toggleTaskDetails(task.id)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        {expandedTask === task.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${getPriorityColor(task.priority)}`}></div>
                        <span className="font-semibold text-gray-900">Room {room ? room.number : 'N/A'}</span>
                      </div>
                      <span className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(task.status)}`}>
                        {getStatusIcon(task.status)}
                        <span>{task.status.charAt(0).toUpperCase() + task.status.slice(1).replace('-', ' ')}</span>
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setSelectedTask(task);
                          setShowTaskModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      {task.status === 'pending' && (
                        <button
                          onClick={() => updateTaskStatus(task.id, 'in-progress')}
                          className="px-3 py-1 bg-yellow-500 text-white text-xs rounded-lg hover:bg-yellow-600 transition-colors"
                        >
                          Start
                        </button>
                      )}
                      {task.status === 'in-progress' && (
                        <button
                          onClick={() => updateTaskStatus(task.id, 'completed')}
                          className="px-3 py-1 bg-emerald-500 text-white text-xs rounded-lg hover:bg-emerald-600 transition-colors"
                        >
                          Complete
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Assigned to:</span>
                      <span className="font-medium text-gray-900">{staff ? staff.name : 'N/A'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getTaskTypeIcon(task.taskType)}
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium text-gray-900">
                        {task.taskType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Est. Time:</span>
                      <span className="font-medium text-gray-900">{task.estimatedTime} min</span>
                    </div>
                  </div>

                  {expandedTask === task.id && (
                    <div className="mt-4 space-y-3">
                      {(task.checkoutTime || task.nextCheckinTime) && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          {task.checkoutTime && (
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4 text-red-400" />
                              <span className="text-gray-600">Checkout:</span>
                              <span className="font-medium text-red-600">{task.checkoutTime}</span>
                            </div>
                          )}
                          {task.nextCheckinTime && (
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4 text-green-400" />
                              <span className="text-gray-600">Next Check-in:</span>
                              <span className="font-medium text-green-600">{task.nextCheckinTime}</span>
                            </div>
                          )}
                        </div>
                      )}

                      {task.guestRequests && task.guestRequests.length > 0 && (
                        <div className="mt-3">
                          <div className="flex items-center space-x-2 mb-2">
                            <MessageSquare className="w-4 h-4 text-blue-400" />
                            <span className="text-sm font-medium text-gray-700">Guest Requests:</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {task.guestRequests.map((request, index) => (
                              <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                {request}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {task.notes && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-700">{task.notes}</p>
                        </div>
                      )}

                      {(task.startTime || task.completedTime) && (
                        <div className="mt-3 flex items-center space-x-4 text-sm text-gray-600">
                          {task.startTime && (
                            <span>Started: {task.startTime}</span>
                          )}
                          {task.completedTime && (
                            <span>Completed: {task.completedTime}</span>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Staff Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Staff Performance</h3>
          <div className="space-y-4">
            {housekeepingStaff.map((staff) => {
              const staffTasks = tasks.filter(t => t.assignedTo === staff.id);
              const completedTasks = staffTasks.filter(t => t.status === 'completed').length;
              const totalTasks = staffTasks.length;
              const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

              return (
                <div key={staff.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">
                        {staff.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{staff.name}</p>
                      <p className="text-sm text-gray-600">{staff.department}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Tasks Today:</span>
                      <span className="font-medium">{completedTasks}/{totalTasks}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full transition-all"
                        style={{ width: `${completionRate}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Completion Rate</span>
                      <span>{completionRate}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Task Modal */}
      {showTaskModal && (
        <TaskModal
          task={selectedTask}
          rooms={rooms}
          staff={housekeepingStaff}
          onClose={() => {
            setShowTaskModal(false);
            setSelectedTask(null);
          }}
          onSave={(taskData) => {
            if (selectedTask) {
              updateTask({ ...selectedTask, ...taskData });
            } else {
              addTask(taskData);
            }
          }}
        />
      )}
    </div>
  );
};

// Task Modal Component
const TaskModal = ({ task, rooms, staff, onClose, onSave }) => {
  const isEditMode = !!task;
  const [formData, setFormData] = useState({
    roomId: task?.roomId || '',
    assignedTo: task?.assignedTo || '',
    priority: task?.priority || 'medium',
    taskType: task?.taskType || 'checkout-cleaning',
    estimatedTime: task?.estimatedTime || 30,
    notes: task?.notes || '',
    guestRequests: task?.guestRequests?.join(', ') || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      roomId: parseInt(formData.roomId),
      assignedTo: parseInt(formData.assignedTo),
      estimatedTime: parseInt(formData.estimatedTime),
      guestRequests: formData.guestRequests ? formData.guestRequests.split(',').map(r => r.trim()) : []
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">
              {isEditMode ? 'Edit Task' : 'Create New Task'}
            </h3>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <XCircle className="w-6 h-6" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Room</label>
                <select
                  name="roomId"
                  value={formData.roomId}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select a room</option>
                  {rooms.map(room => (
                    <option key={room.id} value={room.id}>
                      Room {room.number} ({room.type})
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assign To</label>
                <select
                  name="assignedTo"
                  value={formData.assignedTo}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select staff</option>
                  {staff.map(emp => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="urgent">Urgent</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Task Type</label>
                  <select
                    name="taskType"
                    value={formData.taskType}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="checkout-cleaning">Checkout Cleaning</option>
                    <option value="maintenance-cleaning">Maintenance Cleaning</option>
                    <option value="deep-cleaning">Deep Cleaning</option>
                    <option value="inspection">Inspection</option>
                    <option value="guest-request">Guest Request</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Time (minutes)</label>
                <input
                  type="number"
                  name="estimatedTime"
                  value={formData.estimatedTime}
                  onChange={handleChange}
                  min="10"
                  max="240"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Guest Requests (comma separated)</label>
                <input
                  type="text"
                  name="guestRequests"
                  value={formData.guestRequests}
                  onChange={handleChange}
                  placeholder="Extra towels, Late checkout, etc."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {isEditMode ? 'Update Task' : 'Create Task'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};