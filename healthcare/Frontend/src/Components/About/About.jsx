

import React from "react";
import "./About.css";
import aboutImage from "../../assets/about-image.png"; // update path if needed

export default function About() {
  return (
    <div className="hs-about-section">
      <div className="hs-about-title">
        <h1>About Us</h1>
        <p className="hs-about-subtitle">
          HealthSync connects pharmacy, online orders, prescription upload, doctors, emergency services, chatbot, and AI-powered care under one platform.
        </p>
      </div>

      <div className="hs-about-card">
        <div className="hs-about-content">
          <div className="hs-about-text">
            <h2>Welcome to HealthSync</h2>
            <p>
              HealthSync is an all-in-one healthcare platform developed by Dipto
              Saha and Sourav Debnath, aiming to simplify and enhance healthcare
              delivery.
            </p>
            <p>
              Our services include online medicine ordering, doctor appointment
              booking, ambulance and emergency support, medical test scheduling,
              and personalized AI-powered health recommendations.
            </p>
            <p>
              By integrating these features, HealthSync ensures that users receive
              timely care, accurate health insights, and easy access to
              professional services—all from the comfort of home.
            </p>
            <p>
              This platform is built with a React.js frontend and a Django
              backend, integrating modern healthcare services. It leverages
              machine learning to suggest primary medications and health tips
              based on symptoms. Additionally, an LLM-powered chatbot provides
              personalized healthcare guidance and 24/7 support.
            </p>
          </div>
          <div className="hs-about-image">
            <img src={aboutImage} alt="Healthcare Service" />
          </div>
        </div>
      </div>
    </div>
  );
}
