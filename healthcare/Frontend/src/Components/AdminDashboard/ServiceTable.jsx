import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ServiceTable() {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    name: "",
    description: "",
    image: null,
  });
  const [editingService, setEditingService] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/services/");
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
      toast.error("Failed to fetch services.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewService((prev) => ({ ...prev, image: file }));
    }
  };

  const handleAddOrUpdateService = async () => {
    const formData = new FormData();
    formData.append("name", newService.name);
    formData.append("description", newService.description);
    if (newService.image) {
      formData.append("image", newService.image);
    }

    try {
      setLoading(true);

      if (editingService) {
        // API request to update the service
        const response = await axios.put(
          `http://127.0.0.1:8000/api/services/${editingService.id}/edit/`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        // Update service in the state
        setServices((prev) =>
          prev.map((service) =>
            service.id === editingService.id ? response.data : service
          )
        );
        toast.success("Service updated successfully!");
      } else {
        // API request to add a new service
        const response = await axios.post(
          "http://127.0.0.1:8000/api/services/create/",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        // Add new service to the state
        setServices((prev) => [...prev, response.data]);
        toast.success("Service added successfully!");
      }

      resetForm();
    } catch (error) {
      console.error(
        "Error saving service:",
        error.response?.data || error.message
      );
      toast.error("Failed to save service.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteService = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/services/${id}/delete/`);
      setServices((prev) => prev.filter((service) => service.id !== id));
      toast.success("Service deleted successfully!");
    } catch (error) {
      console.error("Error deleting service:", error);
      toast.error("Failed to delete service.");
    }
  };

  const handleEditClick = (service) => {
    setEditingService(service);
    setNewService({
      name: service.name,
      description: service.description,
      image: null,
    });
  };

  const resetForm = () => {
    setEditingService(null);
    setNewService({ name: "", description: "", image: null });
  };

  return (
    <div className="container mt-4">
      <ToastContainer position="top-center" autoClose={2000} />
      <h2>Service Table</h2>

      {loading ? (
        <p>Loading services...</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id}>
                <td>{service.name}</td>
                <td>{service.description}</td>
                <td>
                  <img
                    src={`http://127.0.0.1:8000${service.image}`}
                    alt={service.name}
                    style={{ width: "100px" }}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEditClick(service)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteService(service.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h3>{editingService ? "Edit Service" : "Add New Service"}</h3>
      <div className="mb-3" style={{ width: "100%" }}>
        <input
          type="text"
          name="name"
          
          placeholder="Name"
          value={newService.name}
          onChange={handleInputChange}
          className="form-control mb-2"
          disabled={loading}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={newService.description}
          onChange={handleInputChange}
          className="form-control mb-2"
          disabled={loading}
        ></textarea>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="form-control mb-2"
          disabled={loading}
        />
        <button
          className="btn btn-primary"
          onClick={handleAddOrUpdateService}
          disabled={loading}
        >
          {editingService ? "Update Service" : "Add Service"}
        </button>
        {editingService && (
          <button className="btn btn-secondary ms-2" onClick={resetForm}>
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
