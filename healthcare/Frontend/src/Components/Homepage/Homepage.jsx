import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import axios from "axios";
import backgroundImg from "../../assets/background.jpeg";
import backgroundImage1 from "../../assets/banner.webp";
import backgroundImage2 from "../../assets/banner1.webp";

import "./Homepage.css";

const Homepage = () => {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

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

  


  if (loading) {
    return <div>Loading...</div>; // Add a loading state while checking login status
  }

  return (
    <div className="home">
      <Navbar />
      <div className="background-section" style={{ backgroundImage: `url(${backgroundImg})` }}>
        
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;


