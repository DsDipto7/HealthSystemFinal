
//updated on 21/05/2025 that don't modify other files css   and protected

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./DoctorProfile.module.css";

export default function DoctorProfile() {
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const doctorData = localStorage.getItem("doctor");
    if (doctorData) {
      const parsed = JSON.parse(doctorData);
      setDoctor(parsed);
      setFormData(parsed);
    } else {
      navigate("/doctorlogin");
    }
  }, [navigate]);

  if (!doctor) return <p>Loading profile...</p>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, photo: e.target.files[0] }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/doctor_auth/update/${doctor.doctor_id}/`,
        {
          method: "PUT",
          body: form,
        }
      );

      if (response.ok) {
        alert("Profile updated successfully!");
        const updatedDoctor = await response.json();
        localStorage.setItem("doctor", JSON.stringify(updatedDoctor));
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.doctorProfile}>
      <div className={styles.profileWrapper}>
        <h2 className={styles.title}>DOCTOR'S Profile</h2>
        <div className={styles.profileCard}>
          {doctor.photo_url && (
            <img
              src={`http://127.0.0.1:8000${doctor.photo_url}`}
              alt="Doctor"
              className={styles.profilePhoto}
            />
          )}
          <form
            onSubmit={handleUpdate}
            encType="multipart/form-data"
            className={styles.form}
          >
            <label>Name:</label>
            <input
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
            />
            <small>* You can keep it or update it with proper validation</small>

            <label>Profile Image:</label>
            <input type="file" onChange={handleFileChange} />

            <label>Specialist:</label>
            <input
              name="specialist"
              value={formData.specialist || ""}
              onChange={handleChange}
            />

            <label>Qualification:</label>
            <input
              name="qualification"
              value={formData.qualification || ""}
              onChange={handleChange}
            />

            <label>College Name:</label>
            <input
              name="college_name"
              value={formData.college_name || ""}
              onChange={handleChange}
            />

            <label>Experience:</label>
            <input
              name="experience"
              value={formData.experience || ""}
              onChange={handleChange}
            />

            <label>Consultation Fee:</label>
            <input
              name="consultation_fee"
              value={formData.consultation_fee || ""}
              onChange={handleChange}
            />

            <label>Available Time:</label>
            <input
              name="available_time"
              value={formData.available_time || ""}
              onChange={handleChange}
            />

            <label>Bio:</label>
            <textarea
              name="bio"
              value={formData.bio || ""}
              onChange={handleChange}
            ></textarea>

            <button type="submit" className={styles.updateBtn}>
              Update Profile
            </button>
          </form>

          <button
            className={styles.logoutBtn}
            onClick={() => {
              localStorage.clear();
              navigate("/doctorlogin");
            }}
          >
            Logout
          </button>
        
        </div>
      </div>
    </div>
  );
}

