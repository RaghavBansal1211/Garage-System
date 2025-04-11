import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UpdateInvoice = () => {
  const [invoices, setInvoices] = useState([]);
  const [amountInputs, setAmountInputs] = useState({});

  useEffect(() => {
    axios
      .get('http://localhost:8000/customer/Invoices/fetchAll', { withCredentials: true })
      .then((res) => {
        console.log(res);
        const dueInvoices = res.data.data.filter(inv => inv.Amountstatus.status === 'Due');
        setInvoices(dueInvoices);
      })
      .catch((err) => {
        console.error('Error fetching invoices:', err);
      });
  }, []);

  const handleInputChange = (id, value) => {
    setAmountInputs((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const handlePaymentSubmit = async (invoiceId) => {
    const enteredAmount = Number(amountInputs[invoiceId]);
    console.log(enteredAmount);

    if (!enteredAmount || enteredAmount <= 0) return;

    try {
      await axios.patch(
        `http://localhost:8000/customer/updateInvoicePayment/${invoiceId}`,
        { amountPaid: enteredAmount },
        { withCredentials: true }
      );

      // Refresh the list
      const updated = await axios.get('http://localhost:8000/customer/Invoices/fetchAll', { withCredentials: true });
      const dueInvoices = updated.data.data.filter((inv) => inv.Amountstatus.status === 'Due');
      setInvoices(dueInvoices);
      setAmountInputs((prev) => ({ ...prev, [invoiceId]: '' }));
    } catch (err) {
      console.error('Error updating invoice:', err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Update Invoice Payments</h2>
      {invoices.length === 0 ? (
        <p>No due invoices found.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Customer</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Vehicle No</th>
              <th className="border px-4 py-2">Total</th>
              <th className="border px-4 py-2">Remaining</th>
              <th className="border px-4 py-2">Enter Amount</th>
              <th className="border px-4 py-2">Update</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => {
              const remaining = inv.finalAmount - inv.Amountstatus.amountPaid;

              return (
                <tr key={inv._id} className="text-center">
                  <td className="border px-4 py-2">{inv.jobCardId.customerId.name}</td>
                  <td className="border px-4 py-2">{inv.jobCardId.customerId.phone}</td>
                  <td className="border px-4 py-2">{inv.jobCardId.vehicleNumber}</td>
                  <td className="border px-4 py-2">₹{inv.finalAmount}</td>
                  <td className="border px-4 py-2 text-red-600 font-semibold">₹{remaining}</td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      min="1"
                      className="border rounded px-2 py-1 w-24"
                      value={amountInputs[inv._id] || ''}
                      onChange={(e) => handleInputChange(inv._id, e.target.value)}
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handlePaymentSubmit(inv._id)}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      Pay
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UpdateInvoice;
