
//for  crud of varous things of a doctor 
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "./DoctorTable.css";
import "react-toastify/dist/ReactToastify.css";

export default function DoctorTable() {
  const [doctors, setDoctors] = useState([]);
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    license_number: "",
    qualification: "",
    email: "",
    college_name: "",
    photo: null,
    specialist: "",
    bio: "",
    experience: "",
    consultation_fee: "",
    available_time: ""
  });
  const [editingDoctor, setEditingDoctor] = useState(null);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/doctor/");
      setDoctors(res.data);
    } catch (err) {
      toast.error("Failed to fetch doctors.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setNewDoctor({ ...newDoctor, photo: files[0] });
    } else {
      setNewDoctor({ ...newDoctor, [name]: value });
    }
  };

  const resetForm = () => {
    setNewDoctor({
      name: "",
      license_number: "",
      qualification: "",
      email: "",
      college_name: "",
      photo: null,
      specialist: "",
      bio: "",
      experience: "",
      consultation_fee: "",
      available_time: ""
    });
    setEditingDoctor(null);
  };

  const handleAddOrEdit = async () => {
    const formData = new FormData();
    for (let key in newDoctor) {
      if (newDoctor[key]) formData.append(key, newDoctor[key]);
    }

    try {
      if (editingDoctor) {
        const res = await axios.put(
          `http://127.0.0.1:8000/doctor/${editingDoctor.id}/update/`,
          formData
        );
        setDoctors((prev) =>
          prev.map((doc) => (doc.id === editingDoctor.id ? res.data : doc))
        );
        toast.success("Doctor updated successfully!");
      } else {
        const res = await axios.post(
          "http://127.0.0.1:8000/doctor/create/",
          formData
        );
        setDoctors([...doctors, res.data]);
        toast.success("Doctor added successfully!");
      }
      resetForm();
    } catch (error) {
      toast.error("Failed to submit doctor data.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/doctor/${id}/delete/`);
      setDoctors(doctors.filter((doc) => doc.id !== id));
      toast.success("Doctor deleted!");
    } catch (error) {
      toast.error("Failed to delete doctor.");
    }
  };

  const handleEditClick = (doctor) => {
    setEditingDoctor(doctor);
    setNewDoctor({
      name: doctor.name,
      license_number: doctor.license_number,
      qualification: doctor.qualification,
      email: doctor.email,
      college_name: doctor.college_name,
      photo: null,
      specialist: doctor.specialist,
      bio: doctor.bio,
      experience: doctor.experience,
      consultation_fee: doctor.consultation_fee,
      available_time: doctor.available_time
    });
  };

  return (
    <div className="doctor-container">
      <ToastContainer position="top-center" autoClose={2000} />
      <h2 className="doctor-title">Doctor Management</h2>

      <table className="doctor-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Photo</th>
            <th>License</th>
            <th>Email</th>
            <th>College</th>
            <th>Qualification</th>
            <th>Specialist</th>
            <th>Experience</th>
            <th>Consultation Fee</th>
            <th>Available Time</th>
            <th>Bio</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doc) => (
            <tr key={doc.id}>
              <td>{doc.name}</td>
              <td>
                <img
                  src={`http://127.0.0.1:8000${doc.photo}`}
                  alt="doc"
                  height="50"
                />
              </td>
              <td>{doc.license_number}</td>
              <td>{doc.email}</td>
              <td>{doc.college_name}</td>
              <td>{doc.qualification}</td>
              <td>{doc.specialist}</td>
              <td>{doc.experience} yrs</td>
              <td>₹{doc.consultation_fee}</td>
              <td>{doc.available_time}</td>
              <td>{doc.bio}</td>
              <td>
                <button onClick={() => handleEditClick(doc)}>Edit</button>
                <button onClick={() => handleDelete(doc.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="doctor-form">
        <h3>{editingDoctor ? "Edit Doctor" : "Add Doctor"}</h3>
        <input type="text" name="name" value={newDoctor.name} onChange={handleInputChange} placeholder="Doctor Name" />
        <input type="file" name="photo" onChange={handleInputChange} />
        <input type="text" name="license_number" value={newDoctor.license_number} onChange={handleInputChange} placeholder="6-digit License" />
        <input type="text" name="qualification" value={newDoctor.qualification} onChange={handleInputChange} placeholder="Qualification" />
        <input type="email" name="email" value={newDoctor.email} onChange={handleInputChange} placeholder="Email" />
        <input type="text" name="college_name" value={newDoctor.college_name} onChange={handleInputChange} placeholder="College Name" />
        <input type="text" name="specialist" value={newDoctor.specialist} onChange={handleInputChange} placeholder="Specialist (e.g., Cardiologist)" />
        <input type="number" name="experience" value={newDoctor.experience} onChange={handleInputChange} placeholder="Experience (years)" />
        <input type="number" name="consultation_fee" value={newDoctor.consultation_fee} onChange={handleInputChange} placeholder="Consultation Fee (INR)" />
        <input type="text" name="available_time" value={newDoctor.available_time} onChange={handleInputChange} placeholder="Available Time (e.g., 9:00 AM - 5:00 PM)" />
        <textarea name="bio" value={newDoctor.bio} onChange={handleInputChange} placeholder="Bio" rows="3" />
        <button onClick={handleAddOrEdit}>
          {editingDoctor ? "Update" : "Add Doctor"}
        </button>
      </div>
    </div>
  );
}

