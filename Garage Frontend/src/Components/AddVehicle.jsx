import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddVehicle = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [vehicles, setVehicles] = useState({
    vehicleNumber: '',
    make: '',
    model: '',
    manufacturer: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [confirmation, setConfirmation] = useState(false);

  const fetchCustomers = async () => {
    try {
      const res = await axios.get('http://localhost:8000/customer/fetchAll', {
        withCredentials: true,
      });
      setCustomers(res.data.details);
    } catch (err) {
      console.error('Error fetching customers:', err);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleInputChange = (e) => {
    setVehicles({ ...vehicles, [e.target.name]: e.target.value });
  };

  const openVehicleDialog = (customer) => {
    setSelectedCustomer(customer);
    setShowModal(true);
    setConfirmation(false);
    setVehicles({
      vehicleNumber: '',
      make: '',
      model: '',
      manufacturer: '',
    });
  };

  const handleSubmit = async () => {
    try {
      await axios.patch(
        `http://localhost:8000/customer/updateVehicle/${selectedCustomer._id}`,
        { vehicles }, // ✅ Send as object, not array
        { withCredentials: true }
      );
      setShowModal(false);
      setConfirmation(false);
      setSelectedCustomer(null);
    } catch (err) {
      console.error('Failed to add vehicle:', err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Add Vehicle to Customer</h2>
      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Phone</th>
            <th className="border px-4 py-2">Address</th>
            <th className="border px-4 py-2">Action</th>
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
                  onClick={() => openVehicleDialog(cust)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Add Vehicle
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/30">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            {!confirmation ? (
              <>
                <h3 className="text-lg font-semibold mb-4">Enter Vehicle Details</h3>
                <input name="vehicleNumber" value={vehicles.vehicleNumber} onChange={handleInputChange}
                  placeholder="Vehicle Number" className="w-full mb-2 p-2 border rounded" />
                <input name="make" value={vehicles.make} onChange={handleInputChange}
                  placeholder="Make" className="w-full mb-2 p-2 border rounded" />
                <input name="model" value={vehicles.model} onChange={handleInputChange}
                  placeholder="Model" className="w-full mb-2 p-2 border rounded" />
                <input name="manufacturer" value={vehicles.manufacturer} onChange={handleInputChange}
                  placeholder="Manufacturer" className="w-full mb-4 p-2 border rounded" />

                <div className="flex justify-end space-x-3">
                  <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-200 rounded">
                    Cancel
                  </button>
                  <button onClick={() => setConfirmation(true)} className="px-4 py-2 bg-blue-600 text-white rounded">
                    Confirm
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold mb-6 text-center">
                  Confirm adding this vehicle to <strong>{selectedCustomer?.name}</strong>?
                </h3>
                <div className="flex justify-end space-x-3">
                  <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-200 rounded">
                    Cancel
                  </button>
                  <button onClick={handleSubmit} className="px-4 py-2 bg-green-600 text-white rounded">
                    Add Vehicle
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddVehicle;
