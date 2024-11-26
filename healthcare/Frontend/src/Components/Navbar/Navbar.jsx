import React from 'react'
import { Link } from "react-router-dom";
import './Navbar.css'

export default function Navbar() {
  return (
    <header className="header">
      <a href="/" className="logo">
        Logo
      </a>
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/">About</Link>
        <Link to="/">Product</Link>
        <Link to="/">Service</Link>
        <Link to="/">Contact</Link>
        <Link to="/login">Login</Link>
      </nav>
    </header>
  );
}
