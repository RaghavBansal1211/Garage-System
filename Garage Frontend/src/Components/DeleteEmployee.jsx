import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DeleteEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get('http://localhost:8000/user/fetchAll', {
        withCredentials: true,
      });
      setEmployees(res.data.details);
    } catch (err) {
      console.error('Failed to fetch employees:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const confirmDelete = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/user/delete/${selectedEmployee._id}`, {
        withCredentials: true,
      });
      setEmployees((prev) => prev.filter((emp) => emp._id !== selectedEmployee._id));
      setShowModal(false);
      setSelectedEmployee(null);
    } catch (err) {
      console.error('Error deleting employee:', err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Employee List</h2>

      {employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Role</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp._id}>
                <td className="border px-4 py-2">{emp.name}</td>
                <td className="border px-4 py-2">{emp.email}</td>
                <td className="border px-4 py-2">{emp.phone}</td>
                <td className="border px-4 py-2">{emp.role}</td>
                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => confirmDelete(emp)}
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

      {/* 🔴 Custom Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/30">
            <div className="bg-white p-6 rounded-xl shadow-2xl border border-gray-200 animate-fade-in-up w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p className="mb-6">
                Are you sure you want to delete <strong>{selectedEmployee?.name}</strong>?
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
        </div>)
    }


    </div>
  );
};

export default DeleteEmployee;
