import React from 'react'
import './Footer.css'

export default function Footer() {
  return (
    <div>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">HEALTHCARE</div>
          <nav className="footer-nav">
            <a href="/">Privacy Policy</a>
            <a href="/">Terms of Service</a>
            <a href="/">Support</a>
            <a href="/">FAQs</a>
          </nav>
        </div>
        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} Dipto Saha and Souarv Debnath. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
