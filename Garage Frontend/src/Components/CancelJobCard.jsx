import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CancelJobCard = () => {
  const [jobCards, setJobCards] = useState([]);
  const [selectedJobCard, setSelectedJobCard] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:8000/customer/JobCards/fetchAll', { withCredentials: true })
      .then((res) => {
        const approved = res.data.details.filter(jc => jc.status === 'Approved');
        setJobCards(approved);
      })
      .catch((err) => console.error('Error fetching job cards:', err));
  }, []);

  const openModal = (jc) => {
    setSelectedJobCard(jc);
    setShowModal(true);
  };

  const handleCancel = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:8000/customer/cancelJobCard/${selectedJobCard._id}`,
        {},
        { withCredentials: true }
      );

      // Update UI
      setJobCards((prev) =>
        prev.filter((jc) => jc._id !== selectedJobCard._id)
      );

      setShowModal(false);
      setSelectedJobCard(null);
    } catch (err) {
      console.error('Error cancelling job card:', err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Cancel Approved Job Cards</h2>

      {jobCards.map((jc) => (
        <div key={jc._id} className="mb-6 border p-4 rounded shadow">
          <p><strong>Customer Name:</strong> {jc.customerName}</p>
          <p><strong>Vehicle No:</strong> {jc.vehicleNumber}</p>
          <p><strong>Odometer:</strong> {jc.odometer}</p>
          <p><strong>Fuel Level:</strong> {jc.fuelLevel}</p>
          <p><strong>Estimated Cost:</strong> ₹{jc.estimatedCost}</p>

          <div className="mt-2">
            <p className="font-semibold">Issues:</p>
            <ul className="list-disc list-inside ml-2">
              {jc.issues.map((issue, idx) => (
                <li key={idx}>{issue}</li>
              ))}
            </ul>
          </div>

          <div className="mt-2">
            <p className="font-semibold">Parts Needed:</p>
            <ul className="list-disc list-inside ml-2">
              {jc.partsNeeded.map((part, idx) => (
                <li key={idx}>
                  {part.partName} - Qty: {part.quantity}
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-2"><strong>Status:</strong> {jc.status}</p>

          <button
            onClick={() => openModal(jc)}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Cancel
          </button>
        </div>
      ))}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/30">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Confirm Cancellation</h3>
            <p>Are you sure you want to cancel this job card for <strong>{selectedJobCard.customerName}</strong>?</p>

            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                No
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CancelJobCard;
