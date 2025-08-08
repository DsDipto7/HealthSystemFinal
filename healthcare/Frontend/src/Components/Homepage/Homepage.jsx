import React, { useState, useEffect, useContext } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import About from "../About/About";
import Service from "../Service/Service";
import Contact from "../Contact/Contact";
import Product from "../Product/Product";
import Healthbot from "../Healthchatbot/Healthchatbot";
import Ambulance from "../Ambulance/Ambulance";
import axios from "axios";
import "./Homepage.css";
import healthcare from "../../assets/healthcare.jpg"; // Adjust the path as necessary
import { DropdownContext } from "../../context/DropdownContext"; // Import the context

const Homepage = () => {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const { setIsDropdownOpen } = useContext(DropdownContext); // Use context

  useEffect(() => {
    const checkLoggedInUser = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          const response = await axios.get("http://127.0.0.1:8000/api/user/", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setIsLoggedIn(true);
          setUsername(response.data.username);
        } else {
          setIsLoggedIn(false);
        }
      } catch {
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkLoggedInUser();
  }, []);

  const handleGetStartedClick = () => {
    setIsDropdownOpen(true); // Open the dropdown in Navbar
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home">
      <Navbar />
      <main className="homepage-hero">
        <div className="hero-text">
          <h4>💊 Your Complete Health Companion</h4>
          <h1>Smart Healthcare at Your Fingertips</h1>
          <p>
            Welcome to Health Care — your one-stop solution for intelligent
            medical support. Purchase medicines, upload prescriptions, and get
            instant health insights powered by AI. Describe your symptoms and
            receive tailored guidance, precautions, and expert tips. Experience
            the future of healthcare, today.
          </p>
          <button className="upload-btn" onClick={handleGetStartedClick}>
            Get Started
          </button>
        </div>

        <div className="hero-image">
          <img src={healthcare} alt="Doctor typing" />
        </div>
      </main>
      <Footer/>
      
    </div>
  );
};

export default Homepage;
