import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const AddProducts = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [message, setMessage] = useState('');

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        'http://localhost:8000/inventory/add',
        {
          partName: data.partName,
          quantity: Number(data.quantity),
          reorderLevel: Number(data.reorderLevel),
          pricePerUnit: Number(data.pricePerUnit)
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        setMessage('✅ Product added successfully!');
        reset();
      } else {
        setMessage('❌ Failed to add product.');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      setMessage('❌ Something went wrong.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] py-10 bg-gray-100">
      <div className="bg-white border rounded-lg shadow-md p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Add New Product</h2>
        {message && <p className="mb-4 font-medium text-center">{message}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Part Name</label>
            <input
              {...register('partName', { required: true })}
              className="border p-2 w-full rounded"
              placeholder="e.g. Air Filter"
            />
            {errors.partName && <span className="text-red-600 text-sm">This field is required</span>}
          </div>

          <div>
            <label className="block mb-1 font-semibold">Quantity</label>
            <input
              type="number"
              {...register('quantity', { required: true, min: 1 })}
              className="border p-2 w-full rounded"
              placeholder="e.g. 50"
            />
            {errors.quantity && <span className="text-red-600 text-sm">Valid quantity required</span>}
          </div>

          <div>
            <label className="block mb-1 font-semibold">Reorder Level</label>
            <input
              type="number"
              {...register('reorderLevel', { required: true, min: 1 })}
              className="border p-2 w-full rounded"
              placeholder="e.g. 30"
            />
            {errors.reorderLevel && <span className="text-red-600 text-sm">Valid reorder level required</span>}
          </div>

          <div>
            <label className="block mb-1 font-semibold">Price Per Unit</label>
            <input
              type="number"
              {...register('pricePerUnit', { required: true, min: 1 })}
              className="border p-2 w-full rounded"
              placeholder="e.g. 20"
            />
            {errors.pricePerUnit && <span className="text-red-600 text-sm">Valid price required</span>}
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
