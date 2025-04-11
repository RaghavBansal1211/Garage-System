import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import axios from 'axios';

const CreateCustomer = () => {
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
    defaultValues: {
      vehicles: [],
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'vehicles',
  });

  const [message, setMessage] = useState('');

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:8000/customer/create', data, {
        withCredentials: true,
      });
      setMessage('Customer created successfully!');
      reset();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to create customer');
    }
  };

  return (
    <div className="flex justify-center items-start py-10 bg-gray-100 min-h-[calc(100vh-80px)]">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Create Customer</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input {...register('name', { required: 'Name is required' })} placeholder="Name" className="w-full p-3 border rounded" />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <input {...register('phone', { required: 'Phone is required' })} placeholder="Phone" className="w-full p-3 border rounded" />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
          </div>

          <div>
            <input {...register('address', { required: 'Address is required' })} placeholder="Address" className="w-full p-3 border rounded" />
            {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
          </div>

          {/* Vehicle Section */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">Vehicles</h3>
              <button type="button" onClick={() => append({})} className="text-sm text-blue-600 hover:underline">
                + Add Vehicle
              </button>
            </div>

            {fields.map((item, index) => (
              <div key={item.id} className="space-y-2 mb-4 border p-4 rounded bg-gray-50">
                <div className="flex justify-end">
                  <button type="button" onClick={() => remove(index)} className="text-red-500 text-sm hover:underline">Remove</button>
                </div>
                <input {...register(`vehicles.${index}.vehicleNumber`, { required: 'Vehicle Number is required' })} placeholder="Vehicle Number" className="w-full p-2 border rounded" />
                {errors.vehicles?.[index]?.vehicleNumber && <p className="text-red-500 text-sm">{errors.vehicles[index].vehicleNumber.message}</p>}

                <input {...register(`vehicles.${index}.make`, { required: 'Make is required' })} placeholder="Make" className="w-full p-2 border rounded" />
                {errors.vehicles?.[index]?.make && <p className="text-red-500 text-sm">{errors.vehicles[index].make.message}</p>}

                <input {...register(`vehicles.${index}.model`, { required: 'Model is required' })} placeholder="Model" className="w-full p-2 border rounded" />
                {errors.vehicles?.[index]?.model && <p className="text-red-500 text-sm">{errors.vehicles[index].model.message}</p>}

                <input {...register(`vehicles.${index}.manufacturer`, { required: 'Manufacturer is required' })} placeholder="Manufacturer" className="w-full p-2 border rounded" />
                {errors.vehicles?.[index]?.manufacturer && <p className="text-red-500 text-sm">{errors.vehicles[index].manufacturer.message}</p>}
              </div>
            ))}
          </div>

          <button type="submit" className="w-full bg-black text-white py-3 rounded font-semibold hover:bg-gray-800 transition">
            Create Customer
          </button>

          {message && <p className="mt-2 text-green-600 text-center">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default CreateCustomer;
