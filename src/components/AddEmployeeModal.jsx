import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEmployee } from '../store/actions/clientActions';

export const AddEmployeeModal = ({ onClose }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    role: 'manager',
    department: '',
    status: 'active',
    salary: '',
    hireDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addEmployee(formData));
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          Add Employee
        </h2>
<form onSubmit={handleSubmit} className="space-y-6">

  {/* Row 1 */}
  <div className="flex space-x-6">
    <div className="flex-1">
      <label htmlFor="name" className="block mb-1 font-medium text-gray-700">Name</label>
      <input
        id="name"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        className="w-full border px-3 py-2 rounded"
        required
      />
    </div>
  </div>

  {/* Row 2 */}
  <div className="flex space-x-6">
    <div className="flex-1">
      <label htmlFor="phone" className="block mb-1 font-medium text-gray-700">Phone</label>
      <input
        id="phone"
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone"
        className="w-full border px-3 py-2 rounded"
      />
    </div>

    <div className="flex-1">
      <label htmlFor="role" className="block mb-1 font-medium text-gray-700">Role</label>
      <select
        id="role"
        name="role"
        value={formData.role}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        required
      >
        <option value="manager">Manager</option>
        <option value="receptionist">Receptionist</option>
        <option value="housekeeping">Housekeeping</option>
        <option value="maintenance">Maintenance</option>
        <option value="security">Security</option>
      </select>
    </div>
  </div>

  {/* Row 3 */}
  <div className="flex space-x-6">
    <div className="flex-1">
      <label htmlFor="department" className="block mb-1 font-medium text-gray-700">Department</label>
      <input
        id="department"
        type="text"
        name="department"
        value={formData.department}
        onChange={handleChange}
        placeholder="Department"
        className="w-full border px-3 py-2 rounded"
      />
    </div>

    <div className="flex-1">
      <label htmlFor="status" className="block mb-1 font-medium text-gray-700">Status</label>
      <select
        id="status"
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        required
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
        <option value="on-leave">On Leave</option>
      </select>
    </div>
  </div>

  {/* Row 4 */}
  <div className="flex space-x-6">
    <div className="flex-1">
      <label htmlFor="salary" className="block mb-1 font-medium text-gray-700">Salary</label>
      <input
        id="salary"
        type="number"
        name="salary"
        value={formData.salary}
        onChange={handleChange}
        placeholder="Salary"
        className="w-full border px-3 py-2 rounded"
        min="0"
      />
    </div>

    <div className="flex-1">
      <label htmlFor="hireDate" className="block mb-1 font-medium text-gray-700">Hire Date</label>
      <input
        id="hireDate"
        type="date"
        name="hireDate"
        value={formData.hireDate}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
      />
    </div>
  </div>

  <div className="flex justify-end space-x-4 mt-4">
    <button
      type="button"
      onClick={onClose}
      className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
    >
      Cancel
    </button>
    <button
      type="submit"
      className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
    >
      Add Employee
    </button>
  </div>
</form>


      </div>
    </div>
  );
};
