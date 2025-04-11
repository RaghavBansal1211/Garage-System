import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InvoiceDetails = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await axios.get('http://localhost:8000/finance/getAllInvoices', {
          withCredentials: true,
        });
        setInvoices(res.data.data || []);
      } catch (err) {
        console.error('Failed to fetch invoices:', err);
      }
    };

    fetchInvoices();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Invoice Details</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 bg-white shadow-md rounded">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Customer Name</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Vehicle Number</th>
              <th className="border px-4 py-2">Final Amount</th>
              <th className="border px-4 py-2">Amount Paid</th>
              <th className="border px-4 py-2">Amount Left</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, idx) => {
              const jobCard = invoice.jobCardId;
              const customer = jobCard.customerId;
              const finalAmount = invoice.finalAmount;
              const amountPaid = invoice.Amountstatus.amountPaid;
              const amountLeft = (finalAmount - amountPaid).toFixed(2);

              return (
                <tr key={invoice._id}>
                  <td className="border px-4 py-2">{idx + 1}</td>
                  <td className="border px-4 py-2">{customer.name}</td>
                  <td className="border px-4 py-2">{customer.phone}</td>
                  <td className="border px-4 py-2">{jobCard.vehicleNumber}</td>
                  <td className="border px-4 py-2">₹{finalAmount}</td>
                  <td className="border px-4 py-2">₹{amountPaid}</td>
                  <td className="border px-4 py-2 text-red-600 font-semibold">
                    ₹{amountLeft}
                  </td>
                  <td className="border px-4 py-2">{invoice.Amountstatus.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceDetails;
