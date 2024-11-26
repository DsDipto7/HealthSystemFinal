import React from 'react'
import Navbar from '../Navbar/Navbar'
import './Homepage.css'
import backgroundImg from "../../assets/background.jpeg";
import Footer from '../Footer/Footer';

export default function Homepage() {
  return (
    <div className="home">
      <Navbar />
      <div
        className="background-section"
        style={{ backgroundImage: `url(${backgroundImg})` }}
      ></div>
      <Footer />
    </div>
  );
}
