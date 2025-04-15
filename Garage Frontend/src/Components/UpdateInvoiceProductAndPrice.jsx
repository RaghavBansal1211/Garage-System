import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm, useFieldArray } from 'react-hook-form';

const UpdateInvoiceProductAndPrice = () => {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState('');

  const { register, control, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      partsUsed: [],
      discount: 0,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'partsUsed',
  });

  const fetchInvoices = async () => {
    try {
      const res = await axios.get('http://localhost:8000/invoice/getAllInvoices', {
        withCredentials: true,
      });
      setInvoices(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };
  

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleEditClick = (invoice) => {
    setSelectedInvoice(invoice);
    reset({
      partsUsed: invoice.partsUsed.map(p => ({
        partName: p.partName,
        quantity: p.quantity,
        unitPrice: p.unitPrice,
      })),
      discount: 0,
    });
    setEditing(true);
    setMessage('');
  };

  const onSubmit = async (data) => {
    try {
      await axios.patch(`http://localhost:8000/invoice/update/${selectedInvoice._id}`, {
        partsUsed: data.partsUsed,
        discount: Number(data.discount),
        gst: 18,
      }, {
        withCredentials: true,
      });

      setMessage('Invoice updated successfully!');
      setEditing(false);
      setSelectedInvoice(null);
      fetchInvoices(); // Refresh data
    } catch (err) {
      console.error(err);
      setMessage('Failed to update invoice.');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Update Invoice Products and Pricing</h2>

      {message && (
        <div className={`mb-4 p-2 rounded ${message.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message}
        </div>
      )}

      {!editing ? (
        <table className="w-full bg-white border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Customer</th>
              <th className="border px-4 py-2">Vehicle</th>
              <th className="border px-4 py-2">Final Amount</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, idx) => (
              <tr key={invoice._id}>
                <td className="border px-4 py-2">{idx + 1}</td>
                <td className="border px-4 py-2">{invoice.jobCardId.customerId.name}</td>
                <td className="border px-4 py-2">{invoice.jobCardId.vehicleNumber}</td>
                <td className="border px-4 py-2">{invoice.finalAmount}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleEditClick(invoice)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold mb-4">Update Invoice</h3>

          <div className="flex font-semibold mb-1 gap-4">
            <div className="w-1/2">Part Name</div>
            <div className="w-1/2">Quantity</div>
          </div>

          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-4 mb-2">
              <input
                {...register(`partsUsed.${index}.partName`)}
                className="border px-2 py-1 w-1/2"
                placeholder="Part Name"
              />
              <input
                type="number"
                {...register(`partsUsed.${index}.quantity`)}
                className="border px-2 py-1 w-1/2"
                placeholder="Quantity"
              />
              <input
                type="hidden"
                {...register(`partsUsed.${index}.unitPrice`)}
              />
              <button type="button" onClick={() => remove(index)} className="text-red-600 font-bold">X</button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => append({ partName: '', quantity: 0, unitPrice: 0 })}
            className="bg-green-500 text-white px-3 py-1 rounded mb-4"
          >
            + Add Product
          </button>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Discount</label>
            <input
              type="number"
              {...register('discount')}
              className="border px-3 py-1 w-full"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Save Invoice
            </button>
            <button
              type="button"
              onClick={() => {
                setEditing(false);
                setMessage('');
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdateInvoiceProductAndPrice;
