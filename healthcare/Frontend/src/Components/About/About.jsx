// import React from 'react'
// import Navbar from "../Navbar/Navbar";
// import Footer from "../Footer/Footer";
// import Lottie from "lottie-react";
// import AboutLottie from "../../Lottie.json";
// import "./About.css";

// export default function About() {
//   return (
//     <div className="about-page-container">
//       <Navbar />
//       <div className="about-container">
//         <h1>About Us</h1>
        
//           <Lottie animationData={AboutLottie}/>
        
//         <p>
//           Welcome to our platform Healthcare! We are dedicated to providing the best
//           Welcome to our platform! We are dedicated to providing the best
//           services for our users. Our goal is to improve healthcare
//           accessibility through technology.
//         </p>
//         <p>
//           Our team consists of experienced professionals committed to delivering
//           innovative solutions to make your life easier.
//         </p>
//         <p>
//           Thank you for choosing us as your trusted partner in health and
//           wellness.
//         </p>
//       </div>
//       <div className="about-footer">
//         <Footer />
//       </div>
//     </div>
//   );
// }
import React from "react";
import "./About.css";
import aboutImage from "../../assets/about-image.png"; // Replace with your own relevant image

export default function About() {
  return (
    <div className="custom-about-page">
      <div className="about-title">
        <h1>About Us</h1>
        <p className="subtitle">
          HealthSync connects pharmacy, online orders, prescription uplaod,
          doctors, emergency services, chatbot, and AI-powered care under one
          platform.
        </p>
      </div>
      <div className="about-content">
        <div className="about-text">
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
            backend, integrating modern healthcare services. It
            leverages machine learning to suggest primary medications and health
            tips based on symptoms. Additionally, an LLM-powered chatbot
            provides personalized healthcare guidance and 24/7 support.
          </p>
        </div>
        <div className="about-image">
          <img src={aboutImage} alt="Healthcare Service" />
        </div>
      </div>
    </div>
  );
}
