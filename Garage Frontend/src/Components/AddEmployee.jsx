import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const AddEmployee = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [message, setMessage] = useState('');

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:8000/user/create', data, {
        withCredentials: true,
      });
      setMessage('Employee added successfully!');
      reset();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to add employee');
    }
  };

  return (
    <div className="flex justify-center items-start py-10 bg-gray-100 min-h-[calc(100vh-80px)]">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Add New Employee</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              {...register('name', { required: 'Name is required' })}
              placeholder="Name"
              className="w-full p-3 border rounded"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <input
              {...register('email', { required: 'Email is required' })}
              placeholder="Email"
              className="w-full p-3 border rounded"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <input
              {...register('password', { required: 'Password is required' })}
              placeholder="Password"
              type="password"
              className="w-full p-3 border rounded"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <div>
            <input
              {...register('phone', { required: 'Phone is required' })}
              placeholder="Phone"
              className="w-full p-3 border rounded"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
          </div>

          <div>
            <select
              {...register('role', { required: 'Role is required' })}
              className="w-full p-3 border rounded"
            >
              <option value="">Select Role</option>
              <option value="TECHNICIAN">Technician</option>
              <option value="HEADTECHNICIAN">Head Technician</option>
              <option value="STOCKMANAGER">Stock Manager</option>
              <option value="FINANCEMANAGER">Finance Manager</option>
            </select>
            {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded font-semibold hover:bg-gray-800 transition"
          >
            Create Employee
          </button>

          {message && <p className="mt-2 text-green-600 text-center">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
