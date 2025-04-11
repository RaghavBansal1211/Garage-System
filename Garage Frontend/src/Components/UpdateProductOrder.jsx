import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UpdateProductOrder = () => {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:8000/finance/PO/fetchAll', {
        withCredentials: true,
      });
      const filtered = res.data.data.filter(order =>
        order.status === 'Pending' || order.status === 'Approval Awaited'
      );
      setOrders(filtered);
    } catch (err) {
      console.error('Error fetching POs:', err);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axios.patch(
        `http://localhost:8000/finance/updateProductOrders/${id}`,
        { status: newStatus },
        { withCredentials: true }
      );
      setMessage(`✅ PO status updated to "${newStatus}"`);
      fetchOrders();
    } catch (err) {
      console.error('Error updating PO:', err);
      setMessage('❌ Failed to update PO status');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Update Product Orders</h2>
      {message && <p className="mb-4 text-green-600">{message}</p>}
      <table className="w-full table-auto border border-collapse shadow rounded bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">S.No</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Products</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order._id}>
              <td className="border px-4 py-2 text-center">{index + 1}</td>
              <td className="border px-4 py-2 text-center">
                {new Date(order.created_at).toLocaleDateString()}
              </td>
              <td className="border px-4 py-2">
                <ul className="list-disc pl-4">
                  {order.products.map((p, i) => (
                    <li key={i}>
                      {p.productName} — {p.quantity}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="border px-4 py-2 text-center">{order.status}</td>
              <td className="border px-4 py-2 text-center">
                {order.status === 'Pending' ? (
                  <button
                    onClick={() => handleStatusUpdate(order._id, 'Approval Awaited')}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Queue
                  </button>
                ) : order.status === 'Approval Awaited' ? (
                  <button
                    onClick={() => handleStatusUpdate(order._id, 'Approved')}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Approve
                  </button>
                ) : (
                  '—'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UpdateProductOrder;
