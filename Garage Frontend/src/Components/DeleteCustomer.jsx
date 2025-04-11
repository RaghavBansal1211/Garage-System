import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DeleteCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const fetchCustomers = async () => {
    try {
      const res = await axios.get('http://localhost:8000/customer/fetchAll', {
        withCredentials: true,
      });
      setCustomers(res.data.details);
    } catch (err) {
      console.error('Failed to fetch customers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const confirmDelete = (customer) => {
    setSelectedCustomer(customer);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/customer/delete/${selectedCustomer._id}`, {
        withCredentials: true,
      });
      setCustomers((prev) =>
        prev.filter((cust) => cust._id !== selectedCustomer._id)
      );
      setShowModal(false);
      setSelectedCustomer(null);
    } catch (err) {
      console.error('Error deleting customer:', err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Customer List</h2>

      {customers.length === 0 ? (
        <p>No customers found.</p>
      ) : (
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Address</th>
              <th className="border px-4 py-2">Vehicles</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((cust) => (
              <tr key={cust._id}>
                <td className="border px-4 py-2">{cust.name}</td>
                <td className="border px-4 py-2">{cust.phone}</td>
                <td className="border px-4 py-2">{cust.address}</td>
                <td className="border px-4 py-2">
                  {cust.vehicles?.length > 0 ? (
                    <ul className="list-disc list-inside text-left space-y-1">
                      {cust.vehicles.map((v, idx) => (
                        <li key={idx}>
                          <strong>{v.vehicleNumber}</strong> - {v.make}, {v.model}, {v.manufacturer}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-gray-500 italic">No vehicles</span>
                  )}
                </td>
                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => confirmDelete(cust)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* 🔴 Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/30">
          <div className="bg-white p-6 rounded-xl shadow-2xl border border-gray-200 animate-fade-in-up w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p className="mb-6">
              Are you sure you want to delete <strong>{selectedCustomer?.name}</strong>?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteCustomer;
