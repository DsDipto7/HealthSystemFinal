import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DoctorList.css";

export default function Doctor() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:8000/doctor/");
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="doctor-container">
      <h2 className="doctor-title">Available Doctors</h2>

      {loading ? (
        <p>Loading doctors...</p>
      ) : (
        <div className="doctor-row">
          {doctors.map((doctor) => (
            <div className="doctor-card" key={doctor.id}>
              <img
                src={`http://127.0.0.1:8000${doctor.photo}`}
                alt={doctor.name}
                className="doctor-image"
              />
              <h3 className="doctor-name">{doctor.name}</h3>
              <p>
                <strong>Email:</strong> {doctor.email}
              </p>
              <p>
                <strong>College:</strong> {doctor.college_name}
              </p>
              <p>
                <strong>Qualification:</strong> {doctor.qualification}
              </p>
              <p>
                <strong>Specialist:</strong> {doctor.specialist}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
