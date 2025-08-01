import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "./AmbulanceTable.css";

import "react-toastify/dist/ReactToastify.css";

export default function AmbulanceTable() {
  const [ambulances, setAmbulances] = useState([]);
  const [newAmbulance, setNewAmbulance] = useState({ type: "", contact: "" });
  const [editingAmbulance, setEditingAmbulance] = useState(null);

  useEffect(() => {
    fetchAmbulances();
  }, []);

  const fetchAmbulances = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/ambulance/");
      setAmbulances(response.data);
    } catch (error) {
      console.error("Error fetching ambulances:", error);
      toast.error("Failed to fetch ambulances.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAmbulance((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAmbulance = async () => {
    if (newAmbulance.type && newAmbulance.contact) {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/ambulance/create/",
          newAmbulance
        );
        setAmbulances([...ambulances, response.data]);
        toast.success("Ambulance added successfully!");
        resetForm();
      } catch (error) {
        console.error("Error adding ambulance:", error);
        toast.error("Failed to add ambulance.");
      }
    } else {
      toast.error("Please fill in all fields before adding an ambulance.");
    }
  };

  const handleEditAmbulance = async () => {
    if (newAmbulance.type && newAmbulance.contact) {
      try {
        const response = await axios.put(
          `http://127.0.0.1:8000/ambulance/${editingAmbulance.id}/update/`,
          newAmbulance
        );
        setAmbulances(
          ambulances.map((amb) =>
            amb.id === editingAmbulance.id ? response.data : amb
          )
        );
        toast.success("Ambulance updated successfully!");
        resetForm();
      } catch (error) {
        console.error("Error updating ambulance:", error);
        toast.error("Failed to update ambulance.");
      }
    } else {
      toast.error("Please fill in all fields before updating the ambulance.");
    }
  };

  const handleDeleteAmbulance = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/ambulance/${id}/delete/`);
      setAmbulances(ambulances.filter((amb) => amb.id !== id));
      toast.success("Ambulance deleted successfully!");
    } catch (error) {
      console.error("Error deleting ambulance:", error);
      toast.error("Failed to delete ambulance.");
    }
  };

  const handleEditClick = (ambulance) => {
    setEditingAmbulance(ambulance);
    setNewAmbulance({ type: ambulance.type, contact: ambulance.contact });
  };

  const resetForm = () => {
    setEditingAmbulance(null);
    setNewAmbulance({ type: "", contact: "" });
  };

  return (
    <div className="ambulance-containerr">
      <ToastContainer position="top-center" autoClose={2000} />
      <h2 className="ambulance-titlee">Ambulance Management</h2>
      <table className="ambulance-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ambulances.map((ambulance) => (
            <tr key={ambulance.id}>
              <td>{ambulance.id}</td>
              <td>{ambulance.type}</td>
              <td>{ambulance.contact}</td>
              <td className="action-buttons">
                <button
                  className="edit-btn"
                  onClick={() => handleEditClick(ambulance)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteAmbulance(ambulance.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="ambulance-form">
        <h3>{editingAmbulance ? "Edit Ambulance" : "Add Ambulance"}</h3>
        <input
          type="text"
          name="type"
          value={newAmbulance.type}
          onChange={handleInputChange}
          placeholder="Ambulance Type"
          className="input-field"
        />
        <input
          type="text"
          name="contact"
          value={newAmbulance.contact}
          onChange={handleInputChange}
          placeholder="Contact Number"
          className="input-field"
        />
        <button
          className="add-ambulance-btn"
          onClick={editingAmbulance ? handleEditAmbulance : handleAddAmbulance}
        >
          {editingAmbulance ? "Update" : "Add Ambulance"}
        </button>
      </div>
    </div>
  );
}


