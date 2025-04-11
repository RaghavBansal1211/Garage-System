import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import axios from 'axios';

const RaisePO = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      products: [{ productName: '', quantity: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'products',
  });

  const [message, setMessage] = useState('');
  const [lowStock, setLowStock] = useState([]);

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        'http://localhost:8000/inventory/raisePO',
        data,
        { withCredentials: true }
      );
      if (res.data.success) {
        setMessage('✅ Purchase Order raised successfully!');
        reset();
      } else {
        setMessage('❌ Failed to raise Purchase Order.');
      }
    } catch (error) {
      console.error('Error raising PO:', error);
      setMessage('❌ Something went wrong.');
    }
  };

  const fetchLowStock = async () => {
    try {
      const res = await axios.get('http://localhost:8000/inventory/lowQuantity', {
        withCredentials: true,
      });
      if (res.data.success) {
        setLowStock(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching low stock:', err);
    }
  };

  useEffect(() => {
    fetchLowStock();
  }, []);

  return (
    <div className="flex p-6 space-x-6 max-w-7xl mx-auto">
      {/* Left: Form */}
      <div className="w-1/2">
        <h2 className="text-2xl font-bold mb-4">Raise Purchase Order</h2>
        {message && <p className="mb-4 font-medium text-green-600">{message}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 border p-6 bg-white rounded shadow">
          {fields.map((item, index) => (
            <div key={item.id} className="flex gap-4 items-end mb-4">
              <div className="w-1/2">
                <label className="block mb-1 font-semibold">Product Name</label>
                <input
                  {...register(`products.${index}.productName`, { required: 'Product name is required' })}
                  placeholder="Enter product name"
                  className="border p-2 w-full rounded"
                />
                {errors.products?.[index]?.productName && (
                  <span className="text-red-600 text-sm">
                    {errors.products[index].productName.message}
                  </span>
                )}
              </div>
              <div className="w-1/3">
                <label className="block mb-1 font-semibold">Quantity</label>
                <input
                  type="number"
                  {...register(`products.${index}.quantity`, {
                    required: 'Quantity is required',
                    min: { value: 1, message: 'Minimum quantity is 1' },
                  })}
                  placeholder="Enter quantity"
                  className="border p-2 w-full rounded"
                />
                {errors.products?.[index]?.quantity && (
                  <span className="text-red-600 text-sm">
                    {errors.products[index].quantity.message}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-600 font-bold px-2 pb-1 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => append({ productName: '', quantity: '' })}
            className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
          >
            + Add Product
          </button>

          <div className="pt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Raise PO
            </button>
          </div>
        </form>
      </div>

      {/* Right: Low Stock Table */}
      <div className="w-1/2 bg-white border p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Low Stock Products</h2>
        {lowStock.length > 0 ? (
          <table className="w-full border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-3 py-2">Product</th>
                <th className="border px-3 py-2">Current Qty</th>
                <th className="border px-3 py-2">Reorder Level</th>
                <th className="border px-3 py-2">Qty Needed</th>
              </tr>
            </thead>
            <tbody>
              {lowStock.map((item) => {
                const currentQty = item.quantity < 0 ? 0 : item.quantity;
                const needed =
                  item.quantity < 0
                    ? item.reorderLevel + Math.abs(item.quantity)
                    : item.reorderLevel;

                return (
                  <tr key={item._id} className="text-center">
                    <td className="border px-3 py-2">{item.partName}</td>
                    <td className="border px-3 py-2">{currentQty}</td>
                    <td className="border px-3 py-2">{item.reorderLevel}</td>
                    <td className="border px-3 py-2 text-red-600 font-semibold">{needed}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p>No low stock products.</p>
        )}
      </div>
    </div>
  );
};

export default RaisePO;
