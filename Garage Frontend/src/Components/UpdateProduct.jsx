import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UpdateProduct = () => {
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:8000/inventory/fetchAll', {
        withCredentials: true,
      });
      setProducts(res.data.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const handleEdit = (product) => {
    setEditId(product._id);
    setEditData({ ...product });
  };

  const handleChange = (field, value) => {
    setEditData((prev) => ({
      ...prev,
      [field]:
        field === 'quantity' ||
        field === 'reorderLevel' ||
        field === 'pricePerUnit'
          ? value === '' ? '' : Number(value)
          : value,
    }));
  };

  const handleSave = async (id) => {
    try {
      await axios.patch(
        `http://localhost:8000/inventory/update/${id}`,
        {
          quantity: editData.quantity,
          reorderLevel: editData.reorderLevel,
          pricePerUnit: editData.pricePerUnit,
          partName: editData.partName,
        },
        { withCredentials: true }
      );
      setEditId(null);
      fetchProducts();
    } catch (err) {
      console.error('Error updating product:', err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Update Products</h2>
      <table className="w-full border-collapse shadow rounded overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-4 py-2">Part Name</th>
            <th className="border px-4 py-2">Quantity</th>
            <th className="border px-4 py-2">Reorder Level</th>
            <th className="border px-4 py-2">Price Per Unit</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod._id} className="text-center">
              <td className="border px-4 py-2">
                {editId === prod._id ? (
                  <input
                    value={editData.partName ?? ''}
                    onChange={(e) => handleChange('partName', e.target.value)}
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  prod.partName
                )}
              </td>
              <td className="border px-4 py-2">
                {editId === prod._id ? (
                  <input
                    type="number"
                    value={editData.quantity ?? ''}
                    onChange={(e) => handleChange('quantity', e.target.value)}
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  prod.quantity
                )}
              </td>
              <td className="border px-4 py-2">
                {editId === prod._id ? (
                  <input
                    type="number"
                    value={editData.reorderLevel ?? ''}
                    onChange={(e) => handleChange('reorderLevel', e.target.value)}
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  prod.reorderLevel
                )}
              </td>
              <td className="border px-4 py-2">
                {editId === prod._id ? (
                  <input
                    type="number"
                    value={editData.pricePerUnit ?? ''}
                    onChange={(e) => handleChange('pricePerUnit', e.target.value)}
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  `₹${prod.pricePerUnit}`
                )}
              </td>
              <td className="border px-4 py-2">
                {editId === prod._id ? (
                  <button
                    onClick={() => handleSave(prod._id)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(prod)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Update
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UpdateProduct;
