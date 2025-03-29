import React, { useEffect, useState } from "react";
import "./PrescriptionTable.css"; // Custom CSS for styling

export default function PrescriptionTable() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/prescription/list/"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPrescriptions(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, []);

  if (loading) {
    return (
      <div className="prescription-table-container">
        <h2 className="text-center mb-4">Prescriptions</h2>
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="prescription-table-container">
        <h2 className="text-center mb-4">Prescriptions</h2>
        <div className="text-center text-danger">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="prescription-table-container">
      <h2 className="text-center mb-4">Prescriptions</h2>
      <div className="table-responsive">
        <table className="prescription-table">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Full Name</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Prescription Image</th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.length > 0 ? (
              prescriptions.map((prescription, index) => (
                <tr key={prescription.id}>
                  <td>{index + 1}</td>
                  <td>{prescription.full_name}</td>
                  <td>{prescription.phone_number}</td>
                  <td>{prescription.email}</td>
                  <td>
                    <img
                      src={`http://127.0.0.1:8000${prescription.prescription_image}`}
                      alt="Prescription"
                      className="img-thumbnail"
                      width="100"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
