import React from 'react'
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Lottie from "lottie-react";
import AboutLottie from "../../Lottie.json";
import "./About.css";

export default function About() {
  return (
    <div className="about-page-container">
      <Navbar />
      <div className="about-container">
        <h1>About Us</h1>
        
          <Lottie animationData={AboutLottie}/>
        
        <p>
          Welcome to our platform! We are dedicated to providing the best
          services for our users. Our goal is to improve healthcare
          accessibility through technology.
        </p>
        <p>
          Our team consists of experienced professionals committed to delivering
          innovative solutions to make your life easier.
        </p>
        <p>
          Thank you for choosing us as your trusted partner in health and
          wellness.
        </p>
      </div>
      <div className="about-footer">
        <Footer />
      </div>
    </div>
  );
}
