import React, { useEffect, useState } from "react";
import "./AmbulanceRequest.css";

const AmbulanceRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/ambulance-request/list/"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setRequests(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (loading) {
    return (
      <div className="ambulance-request-container">
        <h2 className="ambulance-request-title">Ambulance Requests</h2>
        <div className="ambulance-request-loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ambulance-request-container">
        <h2 className="ambulance-request-title">Ambulance Requests</h2>
        <div className="ambulance-request-error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="ambulance-request-container">
      <h2 className="ambulance-request-title">Ambulance Requests</h2>
      <div className="ambulance-request-wrapper">
        <table className="ambulance-request-table">
          <thead>
            <tr>
              <th>#</th>
              <th>From</th>
              <th>Destination</th>
              <th>Type</th>
              <th>Date</th>
              <th>Time</th>
              <th>Name</th>
              <th>Mobile</th>
            </tr>
          </thead>
          <tbody>
            {requests.length > 0 ? (
              requests.map((req, index) => (
                <tr key={req.id}>
                  <td>{index + 1}</td>
                  <td>{req.from_location}</td>
                  <td>{req.destination}</td>
                  <td>{req.ambulance_type}</td>
                  <td>{req.date}</td>
                  <td>{req.time}</td>
                  <td>{req.name}</td>
                  <td>{req.mobile}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="ambulance-request-no-data">
                  No ambulance requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AmbulanceRequest;
