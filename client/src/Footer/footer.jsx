import React, { useState } from "react";
import './footer.css';

function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (email) {
      alert(`Thank you for subscribing with ${email}`);
      setEmail("");
    } else {
      alert("Please enter a valid email.");
    }
  };

  return (
    <footer className="footer-main">
      {/* Newsletter Section */}
      <div className="footer-newsletter">
        <h2 className="footer-heading">Subscribe to our newsletter</h2>
        <div className="newsletter-input">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleSubscribe}>Subscribe</button>
        </div>
      </div>

      {/* Footer Links Section */}
      <div className="footer-links">
        {/* About */}
        <div className="footer-column">
          <h3>About Us</h3>
          <p>
            Fitzo is your go-to fashion destination for the latest clothing trends,
            offering comfort, quality, and style for every occasion.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/shop">Shop</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/faq">FAQ</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-column">
          <h3>Contact Us</h3>
          <p>Email: support@fitzo.com</p>
          <p>Phone: +92 300 1234567</p>
          <p>Address: Rahimyar Khan, Pakistan</p>
        </div>

        {/* Social Media */}
        <div className="footer-column">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#"><span>📘</span> Facebook</a>
            <a href="#"><span>🐦</span> Twitter</a>
            <a href="#"><span>📸</span> Instagram</a>
            <a href="#"><span>🎥</span> YouTube</a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>© 2026 Fitzo. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;