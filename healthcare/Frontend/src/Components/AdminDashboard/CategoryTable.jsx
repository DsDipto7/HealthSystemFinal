import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CategoryTable() {
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [newCategory, setNewCategory] = useState({
    description: "",
    service: "",
    image: null,
  });
  const [editingCategory, setEditingCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchServices();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/categories/");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to fetch categories.");
    } finally {
      setLoading(false);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/services/");
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
      toast.error("Failed to fetch services.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewCategory((prev) => ({ ...prev, image: file }));
    }
  };

 const handleAddOrUpdateCategory = async () => {
   const formData = new FormData();
   formData.append("description", newCategory.description);
   formData.append("service", newCategory.service);
   if (newCategory.image) {
     formData.append("image", newCategory.image);
   }

   try {
     setLoading(true);

     let response;
     if (editingCategory) {
       response = await axios.put(
         `http://127.0.0.1:8000/api/categories/${editingCategory.id}/edit/`,
         formData,
         { headers: { "Content-Type": "multipart/form-data" } }
       );
       setCategories((prev) =>
         prev.map((category) =>
           category.id === editingCategory.id ? response.data : category
         )
       );
       toast.success("Category updated successfully!");
     } else {
       response = await axios.post(
         "http://127.0.0.1:8000/api/categories/create/",
         formData,
         { headers: { "Content-Type": "multipart/form-data" } }
       );

       // Find the full service object from the services list
       const fullService = services.find(
         (service) => service.id === parseInt(newCategory.service)
       );

       const newCategoryWithService = {
         ...response.data,
         service: fullService || response.data.service,
       };

       setCategories((prev) => [...prev, newCategoryWithService]);
       toast.success("Category added successfully!");
     }

     resetForm();
   } catch (error) {
     console.error(
       "Error saving category:",
       error.response?.data || error.message
     );
     toast.error(
       error.response?.data?.image?.[0] || "Failed to save category."
     );
   } finally {
     setLoading(false);
   }
 };




  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/categories/${id}/delete/`);
      setCategories((prev) => prev.filter((category) => category.id !== id));
      toast.success("Category deleted successfully!");
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete category.");
    }
  };

  const handleEditClick = (category) => {
    setEditingCategory(category);
    setNewCategory({
      description: category.description,
      service: category.service.id, // Service ID for the select dropdown
      image: null, // New image will be uploaded if provided
    });
  };

  const resetForm = () => {
    setEditingCategory(null);
    setNewCategory({ description: "", service: "", image: null });
  };

  return (
    <div className="container mt-4">
      <ToastContainer position="top-center" autoClose={2000} />
      <h2>Category Management</h2>

      {loading ? (
        <p>Loading categories...</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Service</th>
              <th>Description</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.service_name || "N/A"}</td>
                {/* Use service_name field */}
                <td>{category.description}</td>
                <td>
                  <img
                    src={`http://127.0.0.1:8000${category.image}`}
                    alt="Category"
                    style={{ width: "100px" }}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEditClick(category)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h3>{editingCategory ? "Edit Category" : "Add New Category"}</h3>
      <div className="mb-3" style={{ width: "100%" }}>
        <select
          name="service"
          value={newCategory.service}
          onChange={handleInputChange}
          className="form-control mb-2"
          disabled={loading}
        >
          <option value="">Select Service</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
        </select>
        <textarea
          name="description"
          placeholder="Description"
          value={newCategory.description}
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
          style={{ width: "100%" }} // Ensures it matches the table width

        />
        <button
          className="btn btn-primary"
          onClick={handleAddOrUpdateCategory}
          disabled={loading}
        >
          {editingCategory ? "Update Category" : "Add Category"}
        </button>
        {editingCategory && (
          <button className="btn btn-secondary ms-2" onClick={resetForm}>
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
