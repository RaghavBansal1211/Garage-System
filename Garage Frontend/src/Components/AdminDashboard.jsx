import React, { useState } from 'react';
import AddEmployee from './AddEmployee';
import EmployeeList from './EmployeeList';
import DeleteEmployeePage from './DeleteEmployee';
import { useAuth } from '../UserContext';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('add');
  const { user,logout } = useAuth();

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-6">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <ul className="space-y-4">
          <li>
            <button onClick={() => setActiveTab('add')} className="hover:text-gray-300">Add Employee</button>
          </li>
          <li>
            <button onClick={() => setActiveTab('list')} className="hover:text-gray-300">Employee List</button>
          </li>
          <li>
            <button onClick={() => setActiveTab('delete')} className="hover:text-gray-300">Delete Employee</button>
          </li>
          <li>
          <button
            onClick={async () => {
              await logout();
              navigate('/', { replace: true });
            }}
            className="text-red-400 hover:text-red-200"
          >
            Logout
          </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-100 overflow-y-auto">
        <h1 className="text-2xl font-semibold mb-4">Welcome, {user?.name}</h1>
        {activeTab === 'add' && <AddEmployee />}
        {activeTab === 'list' && <EmployeeList />}
        {activeTab === 'delete' && <DeleteEmployeePage />}
      </div>
    </div>
  );
};

export default AdminDashboard;
