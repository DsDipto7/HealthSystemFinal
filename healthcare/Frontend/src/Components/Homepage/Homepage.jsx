import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import axios from "axios";
import backgroundImg from "../../assets/background.jpeg";
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

  // const handleLogout = async () => {
  //   try {
  //     const refreshToken = localStorage.getItem("refreshToken");
  //     if (refreshToken) {
  //       await axios.post("http://127.0.0.1:8000/api/logout/", { refresh: refreshToken });
  //       localStorage.removeItem("accessToken");
  //       localStorage.removeItem("refreshToken");
  //       setIsLoggedIn(false);
  //       setUsername("");
  //     }
  //   } catch {
  //     console.error("Logout failed");
  //   }
  // };

  if (loading) {
    return <div>Loading...</div>; // Add a loading state while checking login status
  }

  return (
    <div className="home">
      <Navbar />
      <div className="background-section" style={{ backgroundImage: `url(${backgroundImg})` }}>
        {/* {isLoggedIn ? (
          <div>
            <h2>Hi, {username}! Thanks for logging in.</h2>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <h2>Please log in to continue.</h2>
        )} */}
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
