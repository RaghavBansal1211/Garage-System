import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GenerateInvoice = () => {
  const [jobCards, setJobCards] = useState([]);
  const [selectedJobCard, setSelectedJobCard] = useState(null);
  const [laborCharges, setLaborCharges] = useState('');
  const [invoice, setInvoice] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:8000/customer/JobCards/fetchAll', { withCredentials: true })
      .then((res) => {
        const approvedCards = res.data.details.filter(jc => jc.status === 'Approved');
        setJobCards(approvedCards);
      })
      .catch((err) => console.error('Error fetching job cards:', err));
  }, []);

  const handleGenerateClick = (jc) => {
    setSelectedJobCard(jc);
    setLaborCharges('');
    setInvoice(null);
    setShowModal(false);
  };

  const handleSubmitLaborCharges = async () => {
    if (!laborCharges || isNaN(laborCharges)) return;

    try {
      const res = await axios.post(
        `http://localhost:8000/customer/createInvoice/${selectedJobCard._id}`,
        { laborCharges:Number(laborCharges)},
        { withCredentials: true }
      );

      const invoiceData = res.data.data;
      console.log(invoiceData);
      setInvoice(invoiceData);
      setShowModal(true);

      // Update job card status
      await axios.patch(
        `http://localhost:8000/customer/updateJobCardStatus/${selectedJobCard._id}`,
        {status:"Invoice Generated"},
        { withCredentials: true }
      );

      // Remove from the jobCards list
      setJobCards(prev => prev.filter(jc => jc._id !== selectedJobCard._id));
    } catch (err) {
      console.error('Error generating invoice:', err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Generate Invoice</h2>

      {jobCards.map((jc) => (
        <div key={jc._id} className="border p-4 rounded mb-4 shadow">
        <p><strong>Customer:</strong> {jc.customerName}</p>
        <p><strong>Vehicle No:</strong> {jc.vehicleNumber}</p>
        <p><strong>Odometer:</strong> {jc.odometer}</p>
        <p><strong>Fuel Level:</strong> {jc.fuelLevel}</p>
        <p><strong>Issues:</strong> {jc.issues.join(', ')}</p>
        <p><strong>Parts Used:</strong></p>
        <ul className="list-disc list-inside mb-2">
        {jc.partsNeeded.map((part, idx) => (
            <li key={idx}>
            {part.partName} x {part.quantity}
            </li>
        ))}
        </ul>
          <button
            onClick={() => handleGenerateClick(jc)}
            className="bg-blue-600 text-white px-4 py-1 rounded mt-2 hover:bg-blue-700"
          >
            Generate Invoice
          </button>
        </div>
      ))}

      {/* Modal for Labor Charges */}
      {selectedJobCard && !invoice && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Enter Labor Charges</h3>
            <input
              type="number"
              placeholder="Labor Charges"
              value={laborCharges}
              onChange={(e) => setLaborCharges(e.target.value)}
              className="block mb-4 p-2 border rounded w-full"
            />
            <button
              onClick={handleSubmitLaborCharges}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {/* Modal for Invoice Preview */}
      {invoice && showModal && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-2xl overflow-y-auto max-h-[90vh]">
            <h3 className="text-2xl font-bold mb-4">Invoice</h3>
            <p><strong>Customer:</strong> {selectedJobCard.customerName}</p>
            <p><strong>Vehicle No:</strong> {selectedJobCard.vehicleNumber}</p>
            <p><strong>Odometer:</strong> {selectedJobCard.odometer}</p>
            <p><strong>Fuel Level:</strong> {selectedJobCard.fuelLevel}</p>
            <p><strong>Issues:</strong> {selectedJobCard.issues.join(', ')}</p>
            <p className="mt-4 font-semibold">Parts Used:</p>
            <ul className="list-disc list-inside mb-4">
              {invoice.partsUsed.map((part, index) => (
                <li key={index}>
                  {part.partName} — ₹{part.unitPrice} x {part.quantity} = ₹{part.unitPrice * part.quantity}
                </li>
              ))}
            </ul>
            <p><strong>Labor Charges:</strong> ₹{invoice.laborCharges}</p>
            <p><strong>GST ({invoice.gst}%):</strong> ₹{(invoice.finalAmount - invoice.laborCharges - invoice.partsUsed.reduce((a, b) => a + b.unitPrice * b.quantity, 0)).toFixed(2)}</p>
            <p className="text-xl mt-2 font-bold">Total Amount: ₹{invoice.finalAmount}</p>

            <button
              onClick={() => {
                setInvoice(null);
                setShowModal(false);
                setSelectedJobCard(null);
              }}
              className="mt-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerateInvoice;
