import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RemoveProduct = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:8000/inventory/fetchAll', { withCredentials: true });
      setProducts(res.data.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const confirmRemove = (id) => {
    setSelectedProductId(id);
    setShowModal(true);
  };

  const handleRemove = async () => {
    try {
      await axios.delete(`http://localhost:8000/inventory/delete/${selectedProductId}`, { withCredentials: true });
      setMessage('Product removed successfully.');
      setProducts((prev) => prev.filter((prod) => prod._id !== selectedProductId));
    } catch (err) {
      console.error('Error removing product:', err);
      setMessage('Error removing product.');
    } finally {
      setShowModal(false);
      setSelectedProductId(null);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Remove Products</h2>
      {message && <p className="mb-4 text-green-600 font-semibold">{message}</p>}
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
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
                <td className="border px-4 py-2">{prod.partName}</td>
                <td className="border px-4 py-2">{prod.quantity}</td>
                <td className="border px-4 py-2">{prod.reorderLevel}</td>
                <td className="border px-4 py-2">₹{prod.pricePerUnit}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => confirmRemove(prod._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Confirmation Modal */}
      {showModal && (
  <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
    <div className="bg-white p-6 rounded shadow-md max-w-sm w-full text-center border">
      <h3 className="text-lg font-bold mb-4">Confirm Deletion</h3>
      <p className="mb-6">Are you sure you want to remove this product?</p>
      <div className="flex justify-center gap-4">
        <button
          onClick={handleRemove}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Yes, Remove
        </button>
        <button
          onClick={() => setShowModal(false)}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default RemoveProduct;
