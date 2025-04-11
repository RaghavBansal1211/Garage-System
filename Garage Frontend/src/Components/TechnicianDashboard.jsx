import React, { useState } from 'react';
import DeleteCustomer from './DeleteCustomer';
import { useAuth } from '../UserContext';
import CreateCustomer from './CreateCustomer';
import CustomerList from './CustomerList';
import UpdateCustomer from './UpdateCustomer';
import AddVehicle from './AddVehicle';
import CreateJobCard from './CreateJobCard';
import UpdateJobCard from './UpdateJobCard';
import CancelJobCard from './CancelJobCard';
import GenerateInvoice from './GenerateInvoice';
import UpdateInvoice from './UpdateInvoice';

const TechnicianDashboard = () => {
  const [activeTab, setActiveTab] = useState('add');
  const { user,logout } = useAuth();

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-6">
        <h2 className="text-xl font-bold mb-6">Technician Panel</h2>
        <ul className="space-y-4">
          <li>
            <button onClick={() => setActiveTab('add')} className="hover:text-gray-300">Add Customer</button>
          </li>
          <li>
            <button onClick={() => setActiveTab('list')} className="hover:text-gray-300">Customer List</button>
          </li>
          <li>
            <button onClick={() => setActiveTab('delete')} className="hover:text-gray-300">Delete Customer</button>
          </li>
          <li>
            <button onClick={() => setActiveTab('update')} className="hover:text-gray-300">Update Customer</button>
          </li>
          <li>
            <button onClick={() => setActiveTab('add-vehicle')} className="hover:text-gray-300">Add Vehicle</button>
          </li>
          <li>
            <button onClick={() => setActiveTab('add-job-card')} className="hover:text-gray-300">Create Job Card</button>
          </li>
          <li>
            <button onClick={() => setActiveTab('update-job-card')} className="hover:text-gray-300">Update Job Card</button>
          </li>
          <li>
            <button onClick={() => setActiveTab('cancel-job-card')} className="hover:text-gray-300">Cancel Job Card</button>
          </li>
          <li>
            <button onClick={() => setActiveTab('add-invoice')} className="hover:text-gray-300">Generate Invoice</button>
          </li>
          <li>
            <button onClick={() => setActiveTab('update-invoice')} className="hover:text-gray-300">Update Invoice</button>
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
        {activeTab === 'add' && <CreateCustomer/>}
        {activeTab === 'list' && <CustomerList/>}
        {activeTab === 'delete' && <DeleteCustomer />}
        {activeTab === 'update' && <UpdateCustomer/>}
        {activeTab === 'add-vehicle' && <AddVehicle/>}
        {activeTab === 'add-job-card' && <CreateJobCard/>}
        {activeTab === 'update-job-card' && <UpdateJobCard/>}
        {activeTab === 'cancel-job-card' && <CancelJobCard/>}
        {activeTab === 'add-invoice' && <GenerateInvoice/>}
        {activeTab === 'update-invoice' && <UpdateInvoice/>}

      </div>
    </div>
  );
};

export default TechnicianDashboard;
