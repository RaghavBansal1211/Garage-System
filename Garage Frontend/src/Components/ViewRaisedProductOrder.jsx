import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewRaisedProductOrder = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:8000/inventory/PO/fetchAll', {
        withCredentials: true,
      });
      setOrders(res.data.data || []);
    } catch (error) {
      console.error('Error fetching POs:', error);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Purchase Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 bg-white shadow rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">PO ID</th>
              <th className="border px-4 py-2 text-left">Products</th>
              <th className="border px-4 py-2 text-left">Date Raised</th>
              <th className="border px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((po, index) => (
              <tr key={po._id}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">
                  <ul className="list-disc pl-5">
                    {po.products.map((product, i) => (
                      <li key={i}>
                        {product.productName} - {product.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="border px-4 py-2">{formatDate(po.createdAt)}</td>
                <td className="border px-4 py-2">{po.status}</td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-500">
                  No Purchase Orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewRaisedProductOrder;
