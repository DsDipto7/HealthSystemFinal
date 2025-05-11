// modified on 23/03/2025

import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { DropdownContext } from "../../context/DropdownContext"; // context import
import "./Navbar.css";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  // use dropdown context instead of internal state
  const { isDropdownOpen, setIsDropdownOpen } = useContext(DropdownContext);

  useEffect(() => {
    const checkLoggedInUser = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const response = await axios.get(
            "http://127.0.0.1:8000/api/user-info/",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setIsLoggedIn(true);
          setUsername(response.data.username || "User");
          localStorage.setItem("username", response.data.username || "User");
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
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setIsLoggedIn(false);
        setUsername("");
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="header">
      <div className="logo-container">
        <a href="/" className="logo">
          HEALTHCARE
        </a>
        <p className="logo-subtext">(your health is our first priority)</p>
      </div>

      <nav className="navbar">
        <Link to="/">Home</Link>

        {/* Dropdown Menu */}
        <div className="dropdown">
          <button
            className="dropbtn"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            More ▼
          </button>
          {isDropdownOpen && (
            <div className="dropdown-content">
              <Link to="/about">About</Link>
              <Link to="/predictdisease">Prediction</Link>
              <Link to="/product">Product</Link>
              <Link to="/service">Service</Link>
              <Link to="/chat">Chat</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/ambulance">Ambulance</Link>
              <Link to="/doctor">Doctor</Link>
              <Link to="/healthchatbot">Healthbot</Link>
            </div>
          )}
        </div>

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
