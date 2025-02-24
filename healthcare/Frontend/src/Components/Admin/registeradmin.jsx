import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./registration.css";
import back from "../../assets/back.jpg";

const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("full_name", formData.full_name);
    data.append("email", formData.email);
    data.append("password", formData.password);

    try {
      const response = await axios.post(
        "http://localhost:8000/candidates/",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Admin created:", response.data);
      toast.clearWaitingQueue();
      toast.success("Admin created successfully!");

      // Clear the form fields
      setFormData({
        full_name: "",
        email: "",
        password: "",
      });

      // Redirect to home page after a delay
      setTimeout(() => {
        navigate("/loginadmin");
      }, 3000);
    } catch (error) {
      console.error("Error creating profile:", error);
      toast.clearWaitingQueue();
      toast.error("Failed to create profile:" + error);
    }
  };

  return (
    <div
      className="background-section"
      style={{ backgroundImage: `url(${back})` }}
    >
      <div className="main-reg-div container">
        <ToastContainer
          className="toast-class"
          position="top-center"
          autoClose={2000}
        />
        <div className="row justify-content-center align-items-center vh-100">
          <div className="col-md-6 col-lg-4">
            <form
              onSubmit={handleSubmit}
              className="registration-form p-4 shadow-sm rounded"
            >
              <h3 className="text-center mb-4">Admin Registration</h3>
              <input
                type="text"
                name="full_name"
                onChange={handleChange}
                placeholder="Full Name"
                value={formData.full_name}
                required
                className="form-control mb-3"
              />
              <input
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="Email"
                value={formData.email}
                required
                className="form-control mb-3"
              />
              <input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="Password"
                value={formData.password}
                required
                className="form-control mb-3"
              />
              <button type="submit" className="btn btn-primary w-100">
                Submit
              </button>
              <Link to="/loginadmin" className="ghost">go to Admin Login?</Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
