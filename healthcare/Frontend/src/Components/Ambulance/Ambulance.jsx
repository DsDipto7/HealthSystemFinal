import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Ambulance.css";

const Ambulance = () => {
  const [ambulances, setAmbulances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAmbulances = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/ambulance/"); // Adjust API endpoint as needed
        setAmbulances(response.data);
      } catch (error) {
        setError("Failed to fetch ambulance data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAmbulances();
  }, []);

  return (
    <div className="ambulance-container">
      <h2 className="ambulance-title">Available Ambulances</h2>

      {loading ? (
        <p className="loading-text">Loading ambulances...</p>
      ) : error ? (
        <p className="error-text">{error}</p>
      ) : ambulances.length === 0 ? (
        <p className="no-data-text">No ambulances available.</p>
      ) : (
        <div className="ambulance-list">
          {ambulances.map((ambulance) => (
            <div key={ambulance.id} className="ambulance-card">
              <h3 className="ambulance-type">{ambulance.type}</h3>
              <p className="ambulance-contact">
                📞 Contact: {ambulance.contact}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Ambulance;
