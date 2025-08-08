// Footer.js
import React from "react";
import "../App.css"; // Adjust the path if Footer.js is inside /components

const Footer = () => {
  return (
    <footer className="custom-footer">
      <p className="invite-text">
        Join us and be part of something extraordinary.
      </p>

      <div className="footer-links">
        <a href="mailto:contact@ayushvaishnav.com">contact@ayushvaishnav.com</a>
        <span className="divider">|</span>
        <a>info@tokenswap.com</a>
      </div>

      <hr className="footer-divider" />

      <div className="footer-bottom">
        <span className="left">© P4ByAyush2025</span>
        <span className="right">All rights reserved</span>
      </div>
    </footer>
  );
};

export default Footer;