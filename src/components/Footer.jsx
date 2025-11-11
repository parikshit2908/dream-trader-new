import React from "react";
import { Link } from "react-router-dom";

// ✅ Footer is static, so React.memo prevents unnecessary re-renders
const Footer = React.memo(() => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>DreamTraders</h3>
          <p>Professional trading education by MRITUNJAY SINGH</p>
          <div className="social-links">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-linkedin"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/courses">Courses</Link></li>
            <li><Link to="/live-classes">Live Classes</Link></li>
            <li><Link to="/paper-trading">Paper Trading</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Support</h4>
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/testimonials">Testimonials</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Info</h4>
          <p><i className="fas fa-envelope"></i> info@dreamtraders.com</p>
          <p><i className="fas fa-phone"></i> +91 98765 43210</p>
          <p><i className="fas fa-map-marker-alt"></i> Mumbai, India</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 DreamTraders. All rights reserved.</p>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;