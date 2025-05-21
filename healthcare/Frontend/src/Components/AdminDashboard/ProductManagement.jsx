import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    image: null,
  });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/products/");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProduct((prev) => ({ ...prev, image: file }));
    }
  };

  const handleAddProduct = async () => {
    if (
      newProduct.id &&
      newProduct.name &&
      newProduct.description &&
      newProduct.price &&
      newProduct.image
    ) {
      const formData = new FormData();
      formData.append("productId", newProduct.id);
      formData.append("productName", newProduct.name);
      formData.append("productDescription", newProduct.description);
      formData.append("productPrice", newProduct.price);
      formData.append("productImage", newProduct.image);

      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/products/create/",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setProducts((prev) => [...prev, response.data]);
        toast.success("Product added successfully!");
        resetForm();
      } catch (error) {
        console.error("Error adding product:", error.response?.data || error.message);
        toast.error("Failed to add product.");
      }
    } else {
      toast.error("Please fill in all fields before adding a product.");
    }
  };

  const handleEditProduct = async () => {
    if (newProduct.name && newProduct.description && newProduct.price) {
      const formData = new FormData();
      formData.append("productId", editingProduct.id);
      formData.append("productName", newProduct.name);
      formData.append("productDescription", newProduct.description);
      formData.append("productPrice", newProduct.price);

      if (newProduct.image) {
        formData.append("productImage", newProduct.image);
      }

      try {
        const response = await axios.put(
          `http://127.0.0.1:8000/api/products/${editingProduct.id}/edit/`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        const updatedProducts = products.map((product) =>
          product.id === editingProduct.id ? response.data : product
        );
        setProducts(updatedProducts);
        toast.success("Product updated successfully!");
        resetForm();
      } catch (error) {
        console.error("Error updating product:", error.response?.data || error.message);
        toast.error("Failed to update product.");
      }
    } else {
      toast.error("Please fill in all fields before updating the product.");
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/products/${productId}/delete/`);
      setProducts(products.filter((product) => product.id !== productId));
      toast.success("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product.");
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setNewProduct({
      id: product.productId,
      name: product.productName,
      description: product.productDescription,
      price: product.productPrice,
      image: null,
    });
  };

  const resetForm = () => {
    setEditingProduct(null);
    setNewProduct({
      id: "",
      name: "",
      description: "",
      price: "",
      image: null,
    });
  };

  return (
    <div className="product-management-container container mt-5" style={{ boxShadow: "10px 40px 100px rgba(0, 0, 0, 0.2)", borderRadius: "10px", padding: "20px", backgroundColor: "white" }}>
      <ToastContainer position="top-center" autoClose={2000} />
      <h2 style={{ fontWeight: "bold" }}>Product Table</h2>
      <table className="table table-bordered mt-4" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Image</th>
            <th style={{ minWidth: "140px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.productId}>
              <td>{product.productId}</td>
              <td>{product.productName}</td>
              <td>{product.productDescription}</td>
              <td>{product.productPrice}</td>
              <td>
                <img
                  src={`http://127.0.0.1:8000/${product.productImage}`}
                  alt={product.productName}
                  width="50"
                />
              </td>
              <td>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    className="edit-btn btn btn-warning btn-sm"
                    style={{ minWidth: "60px" }}
                    onClick={() => handleEditClick(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn btn btn-danger btn-sm"
                    style={{ minWidth: "60px" }}
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="mt-4">{editingProduct ? "Edit Product" : "Add New Product"}</h3>
      <div className="product-form mt-3">
        <input type="text" name="id" placeholder="ID" value={newProduct.id} onChange={handleInputChange} className="form-control mb-2" />
        <input type="text" name="name" placeholder="Name" value={newProduct.name} onChange={handleInputChange} className="form-control mb-2" />
        <input type="text" name="description" placeholder="Description" value={newProduct.description} onChange={handleInputChange} className="form-control mb-2" />
        <input type="number" name="price" placeholder="Price" value={newProduct.price} onChange={handleInputChange} className="form-control mb-2" />
        <input type="file" accept="image/*" onChange={handleImageUpload} className="form-control mb-2" />
        
        <button className="btn btn-primary" onClick={editingProduct ? handleEditProduct : handleAddProduct}>
          {editingProduct ? "Update Product" : "Add Product"}
        </button>
        {editingProduct && (
          <button className="btn btn-secondary ms-2" onClick={resetForm}>
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
