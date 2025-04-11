import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UpdateCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });
  const [showModal, setShowModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);

  const fetchCustomers = async () => {
    try {
      const res = await axios.get('http://localhost:8000/customer/fetchAll', {
        withCredentials: true,
      });
      setCustomers(res.data.details);
    } catch (err) {
      console.error('Failed to fetch customers:', err);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const openUpdateModal = (customer) => {
    setSelectedCustomer(customer);
    setFormData({
      name: customer.name,
      phone: customer.phone,
      address: customer.address,
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const confirmUpdate = () => {
    setConfirmModal(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.patch(`http://localhost:8000/customer/update/${selectedCustomer._id}`,formData,{
          withCredentials: true,
        }
      );
      setCustomers((prev) =>
        prev.map((cust) => (cust._id === selectedCustomer._id ? { ...cust, ...formData } : cust))
      );
      setShowModal(false);
      setConfirmModal(false);
    } catch (err) {
      console.error('Failed to update customer:', err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Customer List</h2>

      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Phone</th>
            <th className="border px-4 py-2">Address</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((cust) => (
            <tr key={cust._id}>
              <td className="border px-4 py-2">{cust.name}</td>
              <td className="border px-4 py-2">{cust.phone}</td>
              <td className="border px-4 py-2">{cust.address}</td>
              <td className="border px-4 py-2 text-center">
                <button
                  onClick={() => openUpdateModal(cust)}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✏️ Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/30">
          <div className="bg-white p-6 rounded-xl shadow-2xl border w-full max-w-sm animate-fade-in-up">
            <h3 className="text-lg font-semibold mb-4">Update Customer</h3>

            <div className="space-y-3">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full p-2 border rounded"
              />
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full p-2 border rounded"
              />
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmUpdate}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Confirmation Modal */}
      {confirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/30">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-4">Confirm Changes</h3>
            <p className="mb-4">
              Are you sure you want to update <strong>{formData.name}</strong>'s details?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmModal(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateCustomer;
