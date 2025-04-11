import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UpdateJobCard = () => {
  const [jobCards, setJobCards] = useState([]);
  const [selectedJobCard, setSelectedJobCard] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:8000/customer/JobCards/fetchAll', { withCredentials: true })
      .then((res) => {
        const pending = res.data.details.filter((jc) => jc.status === "Pending");
        setJobCards(pending);
      })
      .catch((err) => console.error('Error fetching job cards:', err));
  }, []);
  
  const openModal = (jc) => {
    setSelectedJobCard(jc);
    setShowModal(true);
  };

  const handleApprove = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:8000/customer/updateJobCardStatus/${selectedJobCard._id}`,
        {status:"Approved"},
        { withCredentials: true }
      );

      setJobCards((prev) =>
        prev.map((jc) =>
          jc._id === selectedJobCard._id
            ? { ...jc, status: res.data.data.status }
            : jc
        )
      );

      setShowModal(false);
      setSelectedJobCard(null);
    } catch (err) {
      console.error('Error updating job card status:', err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Update Job Cards</h2>

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
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
            Approve
            </button>
        </div>
    ))}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/30">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">
              Approve Job Card for Vehicle: {selectedJobCard?.vehicleNumber}
            </h3>
            <p className="mb-4">
              Are you sure you want to update the status of this job card to <strong>Approved</strong>?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedJobCard(null);
                }}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleApprove}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateJobCard;
