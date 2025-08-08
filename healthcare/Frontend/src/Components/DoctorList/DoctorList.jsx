
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./DoctorList.css";

// export default function Doctor() {
//   const [doctors, setDoctors] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedDoctor, setSelectedDoctor] = useState(null);
//   const [formData, setFormData] = useState({
//     date: "",
//     time: "",
//     reason: "",
//   });

//   useEffect(() => {
//     fetchDoctors();
//   }, []);

//   const fetchDoctors = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get("http://127.0.0.1:8000/doctor/");
//       setDoctors(response.data);
//     } catch (error) {
//       console.error("Error fetching doctors:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleAppointmentSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("accessToken");
//       const response = await axios.post(
//         "http://127.0.0.1:8000/api/appointments/",
//         {
//           doctor_email: selectedDoctor.email,
//           date: formData.date,
//           time: formData.time,
//           reason: formData.reason,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       alert("Appointment requested successfully!");
//       setSelectedDoctor(null); // Close form
//     } catch (error) {
//       console.error("Error creating appointment:", error);
//       alert("Failed to request appointment.");
//     }
//   };

//   return (
//     <div className="doctor-container">
//       <h2 className="doctor-title">Available Doctors</h2>

//       {loading ? (
//         <p>Loading doctors...</p>
//       ) : (
//         <div className="doctor-row">
//           {doctors.map((doctor) => (
//             <div
//               className="doctor-card"
//               key={doctor.id}
//               onClick={() => setSelectedDoctor(doctor)}
//               style={{ cursor: "pointer" }}
//             >
//               <img
//                 src={`http://127.0.0.1:8000${doctor.photo}`}
//                 alt={doctor.name}
//                 className="doctor-image"
//               />
//               <h3 className="doctor-name">{doctor.name}</h3>
//               <p><strong>Email:</strong> {doctor.email}</p>
//               <p><strong>College:</strong> {doctor.college_name}</p>
//               <p><strong>Qualification:</strong> {doctor.qualification}</p>
//               <p><strong>Specialist:</strong> {doctor.specialist}</p>
//               <p><strong>Bio:</strong> {doctor.bio}</p>
//               <p><strong>Experience:</strong> {doctor.experience} Years</p>
//               <p><strong>Consultation Fee:</strong> {doctor.consultation_fee}</p>
//               <p><strong>Available Time:</strong> {doctor.available_time}</p>
//             </div>
//           ))}
//         </div>
//       )}

//       {selectedDoctor && (
//         <div className="appointment-form">
//           <h3>Book Appointment with Dr. {selectedDoctor.name}</h3>
//           <form onSubmit={handleAppointmentSubmit}>
//             <input
//               type="date"
//               name="date"
//               value={formData.date}
//               onChange={handleInputChange}
//               required
//             />
//             <input
//               type="time"
//               name="time"
//               value={formData.time}
//               onChange={handleInputChange}
//               required
//             />
//             <textarea
//               name="reason"
//               placeholder="Reason for appointment"
//               value={formData.reason}
//               onChange={handleInputChange}
//               required
//             />
//             <button type="submit">Request Appointment</button>
//             <button type="button" onClick={() => setSelectedDoctor(null)}>Cancel</button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// }




// // DoctorList.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// import "./DoctorList.css";

// export default function Doctor() {
//   const [doctors, setDoctors] = useState([]);
//   const [filteredDoctors, setFilteredDoctors] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [selectedDoctor, setSelectedDoctor] = useState(null);
//   const [formData, setFormData] = useState({
//     date: "",
//     time: "",
//     reason: "",
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchDoctors();
//   }, []);

//   const fetchDoctors = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get("http://127.0.0.1:8000/doctor/");
//       setDoctors(response.data);
//       setFilteredDoctors(response.data); // ✅ Initialize filtered list
//     } catch (error) {
//       console.error("Error fetching doctors:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleAppointmentSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("accessToken");
//       await axios.post(
//         "http://127.0.0.1:8000/api/appointments/",
//         {
//           doctor_email: selectedDoctor.email,
//           date: formData.date,
//           time: formData.time,
//           reason: formData.reason,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       alert("Appointment requested successfully!");
//       setSelectedDoctor(null); // ✅ Close form after submission
//     } catch (error) {
//       console.error("Error creating appointment:", error);
//       alert("Failed to request appointment.");
//     }
//   };

//   const handleSearchChange = (e) => {
//     const value = e.target.value.toLowerCase();
//     setSearchTerm(value);
//     const filtered = doctors.filter((doctor) =>
//       doctor.specialist.toLowerCase().includes(value)
//     );
//     setFilteredDoctors(filtered);
//   };

//   return (
//     <div className="doctor-container">
//       <h2 className="doctor-title">Available Doctors</h2>

//       {/* 🔍 Specialist Search */}
//       <div className="doctor-search-container">
//         <input
//           type="text"
//           placeholder="Search by specialist..."
//           value={searchTerm}
//           onChange={handleSearchChange}
//           className="doctor-search-input"
//         />
//         <button className="view-appointments-btn" onClick={() => navigate("/my-appointments")}>
//           View My Appointments
//         </button>
//       </div>

//       {loading ? (
//         <p>Loading doctors...</p>
//       ) : (
//         <div className="doctor-row">
//           {filteredDoctors.map((doctor) => (
//             <div
//               className="doctor-card"
//               key={doctor.id}
//               onClick={() => setSelectedDoctor(doctor)}
//               style={{ cursor: "pointer" }}
//             >
//               <img
//                 src={`http://127.0.0.1:8000${doctor.photo}`}
//                 alt={doctor.name}
//                 className="doctor-image"
//               />
//               <h3 className="doctor-name">{doctor.name}</h3>
//               <p><strong>Email:</strong> {doctor.email}</p>
//               <p><strong>College:</strong> {doctor.college_name}</p>
//               <p><strong>Qualification:</strong> {doctor.qualification}</p>
//               <p><strong>Specialist:</strong> {doctor.specialist}</p>
//               <p><strong>Bio:</strong> {doctor.bio}</p>
//               <p><strong>Experience:</strong> {doctor.experience} Years</p>
//               <p><strong>Consultation Fee:</strong> {doctor.consultation_fee}</p>
//               <p><strong>Available Time:</strong> {doctor.available_time}</p>
//             </div>
//           ))}
//         </div>
//       )}

//       {selectedDoctor && (
//         <div className="appointment-form">
//           <h3>Book Appointment with Dr. {selectedDoctor.name}</h3>
//           <form onSubmit={handleAppointmentSubmit}>
//             <input
//               type="date"
//               name="date"
//               value={formData.date}
//               onChange={handleInputChange}
//               required
//             />
//             <input
//               type="time"
//               name="time"
//               value={formData.time}
//               onChange={handleInputChange}
//               required
//             />
//             <textarea
//               name="reason"
//               placeholder="Reason for appointment"
//               value={formData.reason}
//               onChange={handleInputChange}
//               required
//             />
//             <button type="submit">Request Appointment</button>
//             <button type="button" onClick={() => setSelectedDoctor(null)}>
//               Cancel
//             </button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// }

// DoctorList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./DoctorList.css";

export default function Doctor() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    reason: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:8000/doctor/");
      setDoctors(response.data);
      setFilteredDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      await axios.post(
        "http://127.0.0.1:8000/api/appointments/",
        {
          doctor_email: selectedDoctor.email,
          date: formData.date,
          time: formData.time,
          reason: formData.reason,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Appointment requested successfully!");
      setSelectedDoctor(null);
    } catch (error) {
      console.error("Error creating appointment:", error);
      alert("Failed to request appointment.");
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = doctors.filter((doctor) =>
      doctor.specialist.toLowerCase().includes(value)
    );
    setFilteredDoctors(filtered);
  };

  return (
    <div className="doctor-container">
      <h2 className="doctor-title">Available Doctors</h2>

      {/* Search and View Appointments */}
      <div className="doctor-search-container">
        <input
          type="text"
          placeholder="Search by specialist..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="doctor-search-input"
        />
        <button
          className="view-appointments-btn"
          onClick={() => navigate("/my-appointments")}
        >
          View My Appointments
        </button>
      </div>

      {loading ? (
        <p>Loading doctors...</p>
      ) : (
        <div className="doctor-row">
          {filteredDoctors.map((doctor) => (
            <div
              className="doctor-card"
              key={doctor.id}
              onClick={() => setSelectedDoctor(doctor)}
            >
              <img
                src={`http://127.0.0.1:8000${doctor.photo}`}
                alt={doctor.name}
                className="doctor-image"
              />
              <div>
                <h3 className="doctor-name">{doctor.name}</h3>
                <p className="doctor-description">
                  {doctor.specialist} with {doctor.experience} years of experience.
                  Qualified from {doctor.college_name} ({doctor.qualification}).
                  <br />
                  {doctor.bio}
                  <br />
                  <strong>Available Time:</strong> {doctor.available_time}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedDoctor && (
        <div className="appointment-form">
          <h3>Book Appointment with Dr. {selectedDoctor.name}</h3>
          <form onSubmit={handleAppointmentSubmit}>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="reason"
              placeholder="Reason for appointment"
              value={formData.reason}
              onChange={handleInputChange}
              required
            />
            <button type="submit">Request Appointment</button>
            <button type="button" onClick={() => setSelectedDoctor(null)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
