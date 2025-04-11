import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CreateJobCard = () => {
  const [customers, setCustomers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [jobCard, setJobCard] = useState({
    vehicleNumber: '',
    odometer: '',
    fuelLevel: '',
    issues: [''],
    partsNeeded: [{ partName: '', quantity: '' }],
    estimatedCost: '',
  });

  useEffect(() => {
    axios
      .get('http://localhost:8000/customer/fetchAll', { withCredentials: true })
      .then((res) => {
        const customersWithVehicles = res.data.details.filter(
          (cust) => Array.isArray(cust.vehicles) && cust.vehicles.length > 0
        );
        setCustomers(customersWithVehicles);
      })
      .catch((err) => console.error('Error fetching customers:', err));
  }, []);
  

  const openForm = (cust, vehicle) => {
    setSelected({ customer: cust, vehicle });
    setJobCard((prev) => ({ ...prev, vehicleNumber: vehicle.vehicleNumber }));
    setShowModal(true);
  };

  const handleChange = (e) => {
    setJobCard({ ...jobCard, [e.target.name]: e.target.value });
  };

  const handleIssueChange = (index, value) => {
    const newIssues = [...jobCard.issues];
    newIssues[index] = value;
    setJobCard({ ...jobCard, issues: newIssues });
  };

  const addIssue = () => setJobCard({ ...jobCard, issues: [...jobCard.issues, ''] });

  const handlePartChange = (index, field, value) => {
    const newParts = [...jobCard.partsNeeded];
    newParts[index][field] = value;
    setJobCard({ ...jobCard, partsNeeded: newParts });
  };

  const addPart = () => setJobCard({ ...jobCard, partsNeeded: [...jobCard.partsNeeded, { partName: '', quantity: '' }] });

  const handleSubmit = async () => {
    try {
      const formattedParts = jobCard.partsNeeded.map((part) => ({
        partName: part.partName
          .split(' ')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' '),
        quantity: part.quantity,
      }));
  
      await axios.post(
        `http://localhost:8000/customer/createJobCard/${selected.customer._id}/vehicle/${selected.vehicle._id}`,
        {
          odometer: jobCard.odometer,
          fuelLevel: jobCard.fuelLevel,
          issues: jobCard.issues,
          partsNeeded: formattedParts,
          estimatedCost: jobCard.estimatedCost,
        },
        { withCredentials: true }
      );
  
      setShowModal(false);
      setJobCard({
        vehicleNumber: '',
        odometer: '',
        fuelLevel: '',
        issues: [''],
        partsNeeded: [{ partName: '', quantity: '' }],
        estimatedCost: '',
      });
    } catch (err) {
      console.error('Error creating job card:', err);
    }
  };
  

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Create Job Card</h2>
      {customers.map((cust) => (
        <div key={cust._id} className="mb-6 border p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">{cust.name}</h3>
          {cust.vehicles?.map((vehicle, i) => (
            <div key={i} className="flex justify-between items-center mb-2 bg-gray-100 p-2 rounded">
              <div>
                <p><strong>Vehicle No:</strong> {vehicle.vehicleNumber}</p>
                <p><strong>Model:</strong> {vehicle.model}</p>
              </div>
              <button
                onClick={() => openForm(cust, vehicle)}
                className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
              >
                Create Job Card
              </button>
            </div>
          ))}
        </div>
      ))}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/30">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg">
            <h3 className="text-lg font-bold mb-4">Create Job Card for {selected?.customer?.name}</h3>
            <input name="odometer" value={jobCard.odometer} onChange={handleChange} placeholder="Odometer" className="mb-2 w-full p-2 border rounded" />
            <input name="fuelLevel" value={jobCard.fuelLevel} onChange={handleChange} placeholder="Fuel Level" className="mb-2 w-full p-2 border rounded" />
            <input name="estimatedCost" value={jobCard.estimatedCost} onChange={handleChange} placeholder="Estimated Cost" className="mb-2 w-full p-2 border rounded" />

            <div className="mb-4">
              <p className="font-semibold">Issues</p>
              {jobCard.issues.map((issue, index) => (
                <input key={index} value={issue} onChange={(e) => handleIssueChange(index, e.target.value)} placeholder={`Issue ${index + 1}`} className="mb-1 w-full p-2 border rounded" />
              ))}
              <button onClick={addIssue} className="text-sm text-blue-600 mt-1">+ Add Issue</button>
            </div>

            <div className="mb-4">
              <p className="font-semibold">Parts Needed</p>
              {jobCard.partsNeeded.map((part, index) => (
                <div key={index} className="flex gap-2 mb-1">
                  <input value={part.partName} onChange={(e) => handlePartChange(index, 'partName', e.target.value)} placeholder="Part Name" className="w-1/2 p-2 border rounded" />
                  <input value={part.quantity} onChange={(e) => handlePartChange(index, 'quantity', e.target.value)} placeholder="Quantity" className="w-1/2 p-2 border rounded" />
                </div>
              ))}
              <button onClick={addPart} className="text-sm text-blue-600 mt-1">+ Add Part</button>
            </div>

            <div className="flex justify-end space-x-2">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
              <button onClick={handleSubmit} className="px-4 py-2 bg-green-600 text-white rounded">Create Job Card</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateJobCard;
