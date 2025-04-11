import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get('http://localhost:8000/user/fetchAll', {
          withCredentials: true,
        });
        setEmployees(res.data.details);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };
  
    fetchEmployees();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Employee List</h2>
      <table className="min-w-full bg-white shadow rounded-lg">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Phone</th>
            <th className="py-2 px-4 border">Role</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp._id}>
              <td className="py-2 px-4 border">{emp.name}</td>
              <td className="py-2 px-4 border">{emp.email}</td>
              <td className="py-2 px-4 border">{emp.phone}</td>
              <td className="py-2 px-4 border">{emp.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
