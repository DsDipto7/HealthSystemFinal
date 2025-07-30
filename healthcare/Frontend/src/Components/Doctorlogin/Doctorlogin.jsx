
//date 25/05/2025 for preventing global leakage of cookies
import React, { useState, useEffect } from "react";
import "./Doctorlogin.css";
import bgImage from "../../assets/bg1.jpg";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DoctorLogin() {
  const [email, setEmail] = useState("");
  const [license, setLicense] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split("; ");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        if (cookie.startsWith(name + "=")) {
          cookieValue = decodeURIComponent(cookie.split("=")[1]);
          break;
        }
      }
    }
    return cookieValue;
  }

  useEffect(() => {
    const getCsrfToken = async () => {
      try {
        await fetch("http://127.0.0.1:8000/doctor_auth/get-csrf/", {
          credentials: "include",
        });
      } catch (err) {
        console.error("Failed to fetch CSRF token:", err);
      }
    };
    getCsrfToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const csrfToken = getCookie("csrftoken");

    try {
      const response = await fetch("http://127.0.0.1:8000/doctor_auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        credentials: "include",
        body: JSON.stringify({ email, license_number: license }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("doctor", JSON.stringify(data));
        localStorage.setItem("doctorId", data.doctor_id);
        localStorage.setItem("doctorName", data.name);
        localStorage.setItem("doctorEmail", data.email);
        localStorage.setItem("doctorSpecialist", data.specialist);
        if (data.photo_url) {
          localStorage.setItem("doctorPhoto", data.photo_url);
        }

        toast.success("Login successful!");
        setTimeout(() => {
          navigate("/doctor-profile");
        }, 1000);
      } else {
        toast.error(data.detail || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Network error or server not reachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dl-container">
      <ToastContainer />
      <div className="dl-card">
        <div
          className="dl-image-section"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <h2 className="dl-title">
            <span style={{ color: "#5ef533" }}>DOCTOR'S</span> SIGN IN
          </h2>
        </div>

        <div className="dl-form-section">
          <form className="dl-form" onSubmit={handleSubmit} autoComplete="off">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />

            <label htmlFor="license">License Number</label>
            <input
              type="text"
              id="license"
              placeholder="Enter 6-digit license number"
              value={license}
              onChange={(e) => setLicense(e.target.value)}
              required
              maxLength={6}
              pattern="\d{6}"
              title="Enter a 6-digit license number"
            />

            <button
              type="submit"
              className="dl-button"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <button
              type="button"
              className="dl-button dl-back"
              onClick={() => navigate("/login")}
              disabled={loading}
            >
              Back
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
