
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from 'axios'; // Import axios
import './Navbar.css';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const checkLoggedInUser = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const response = await axios.get("http://127.0.0.1:8000/api/user-info/", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setIsLoggedIn(true);
          setUsername(response.data.username || "User"); // Update username from response
        } catch (error) {
          console.error("Error fetching user info:", error);
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    };

    checkLoggedInUser();
  }, []);

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      const accessToken = localStorage.getItem("accessToken");

      if (refreshToken && accessToken) {
        await axios.post(
          "http://127.0.0.1:8000/api/logout/",
          { refresh: refreshToken },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`, // Include the access token in the headers
            },
          }
        );

        // Clear tokens from localStorage
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setIsLoggedIn(false);
        setUsername("");
        navigate("/login"); // Redirect to login page after logout
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="header">
      <a href="/" className="logo">
        Logo
      </a>
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/predictdisease">Prediction</Link>
        <Link to="/product">Product</Link>
        <Link to="/service">Service</Link>
        <Link to="/chat">Chat</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/healthchatbot">Healthbot</Link>
        {isLoggedIn ? (
          <>
            <span className="navbar-username">Hi, {username}!</span>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
}
