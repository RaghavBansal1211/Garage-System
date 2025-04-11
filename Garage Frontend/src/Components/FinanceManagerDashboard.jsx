import React, { useState } from 'react';
import { useAuth } from '../UserContext';
import UpdateProductOrder from './UpdateProductOrder';
import InvoiceDetails from './InvoiceDetails';

const FinanceManagerDashboard = () => {
  const [activeTab, setActiveTab] = useState('add');
  const { user,logout } = useAuth();

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-6">
        <h2 className="text-xl font-bold mb-6">Finance Manager Panel</h2>
        <ul className="space-y-4">
          <li><button onClick={() => setActiveTab('update')} className="hover:text-gray-300">Update Product Order Status</button></li>
          <li><button onClick={() => setActiveTab('invoice')} className="hover:text-gray-300">Invoice Details</button></li>
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
        {activeTab === 'update' && <UpdateProductOrder/>}
        {activeTab === 'invoice' && <InvoiceDetails/>}
      </div>
    </div>
    )
}

export default FinanceManagerDashboard;
