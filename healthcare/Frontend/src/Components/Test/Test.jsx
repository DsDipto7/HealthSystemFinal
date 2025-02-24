
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Test.css"; // Common CSS for Doctor and Test

export default function Test() {
  const [testCategories, setTestCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTestCategories();
  }, []);

  const fetchTestCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/categories/");
      const filteredCategories = response.data.filter(
        (category) => category.service_name === "Test"
      );
      setTestCategories(filteredCategories);
    } catch (error) {
      console.error("Error fetching test categories:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="category-container">
      <h2 className="category-title">Test Services</h2>
      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : testCategories.length > 0 ? (
        <div className="category-grid">
          {testCategories.map((category) => (
            <div className="category-card" key={category.id}>
              <img
                src={`http://127.0.0.1:8000${category.image}`}
                alt={category.description}
                className="category-image"
              />
              <p className="category-description">{category.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-categories">
          No test services available at the moment.
        </p>
      )}
    </div>
  );
}
