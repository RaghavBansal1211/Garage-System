import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await axios.get('http://localhost:8000/customer/fetchAll', {
          withCredentials: true,
        });
        console.log(res.data.details);
        setCustomers(res.data.details || []);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Customer List</h2>
      <table className="min-w-full bg-white shadow rounded-lg">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Phone</th>
            <th className="py-2 px-4 border">Address</th>
            <th className="py-2 px-4 border">Vehicles</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer._id}>
              <td className="py-2 px-4 border align-top">{customer.name}</td>
              <td className="py-2 px-4 border align-top">{customer.phone}</td>
              <td className="py-2 px-4 border align-top">{customer.address}</td>
              <td className="py-2 px-4 border">
                {customer.vehicles && customer.vehicles.length > 0 ? (
                  <table className="w-full text-sm">
                    <thead>
                      <tr>
                        <th className="border px-2 py-1">Number</th>
                        <th className="border px-2 py-1">Make</th>
                        <th className="border px-2 py-1">Model</th>
                        <th className="border px-2 py-1">Manufacturer</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customer.vehicles.map((v, idx) => (
                        <tr key={idx}>
                          <td className="border px-2 py-1">{v.vehicleNumber}</td>
                          <td className="border px-2 py-1">{v.make}</td>
                          <td className="border px-2 py-1">{v.model}</td>
                          <td className="border px-2 py-1">{v.manufacturer}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <span className="text-gray-500 italic">No Vehicles</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
