import React, { useEffect, useState } from 'react';
import AddProducts from './AddProduct';
import RemoveProduct from './RemoveProduct';
import UpdateProduct from './UpdateProduct';
import RaisePO from './RaisePO';
import { useAuth } from '../UserContext';
import axios from 'axios';
import ViewRaisedProductOrder from './ViewRaisedProductOrder';

const StockManagerDashboard = () => {
  const [activeTab, setActiveTab] = useState('add');
  const { user,logout } = useAuth();
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchLowStock = async () => {
      try {
        const res = await axios.get('http://localhost:8000/inventory/lowQuantity', {
          withCredentials: true,
        });

        const updatedData = res.data.data.map((product) => ({
          ...product,
          quantityNeeded:
            product.quantity < 0
              ? Math.abs(product.quantity) + product.reorderLevel
              : product.reorderLevel,
        }));

        setLowStockProducts(updatedData);
        if (updatedData.length > 0) {
          setShowModal(true);
        }
      } catch (err) {
        console.error('Error fetching low stock products:', err);
      }
    };

    fetchLowStock();
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-6">
        <h2 className="text-xl font-bold mb-6">Stock Manager Panel</h2>
        <ul className="space-y-4">
          <li><button onClick={() => setActiveTab('add')} className="hover:text-gray-300">Add Products</button></li>
          <li><button onClick={() => setActiveTab('remove')} className="hover:text-gray-300">Remove Product</button></li>
          <li><button onClick={() => setActiveTab('update')} className="hover:text-gray-300">Update Product</button></li>
          <li><button onClick={() => setActiveTab('raise-po')} className="hover:text-gray-300">Raise Product Order</button></li>
          <li><button onClick={() => setActiveTab('view-po')} className="hover:text-gray-300">View Raised Product Order</button></li>
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
        {activeTab === 'add' && <AddProducts />}
        {activeTab === 'remove' && <RemoveProduct />}
        {activeTab === 'update' && <UpdateProduct />}
        {activeTab === 'raise-po' && <RaisePO />}
        {activeTab === 'view-po' && <ViewRaisedProductOrder/>}
      </div>

      {/* Modal */}
      {showModal && (
  <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded shadow-lg max-w-3xl w-full">
      <h2 className="text-xl font-semibold mb-4 text-red-600">⚠️ Low Stock Alert</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">Part Name</th>
              <th className="border px-4 py-2 text-center">Current Quantity</th>
              <th className="border px-4 py-2 text-center">Reorder Level</th>
              <th className="border px-4 py-2 text-center text-red-600">Quantity Needed</th>
            </tr>
          </thead>
          <tbody>
            {lowStockProducts.map((item) => (
              <tr key={item._id} className="text-center">
                <td className="border px-4 py-2 text-left">{item.partName}</td>
                <td className="border px-4 py-2">{item.quantity < 0 ? 0 : item.quantity}</td>
                <td className="border px-4 py-2">{item.reorderLevel}</td>
                <td className="border px-4 py-2 text-red-600 font-semibold">{item.quantityNeeded}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-right">
        <button
          onClick={() => setShowModal(false)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  </div>
      )}

    </div>
  );
};

export default StockManagerDashboard;
