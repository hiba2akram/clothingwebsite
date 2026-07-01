import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";
import "./footer.css";

function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };
  

  return (

    
    <footer className="footer">

 <div className="footer__top-strip">
        <div className="footer__strip-track">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="footer__strip-group">
              <span>Free Shipping Over Rs. 5,000</span>
              <span className="footer__strip-dot">·</span>
              <span>Easy 7-Day Returns</span>
              <span className="footer__strip-dot">·</span>
              <span>Secure Checkout</span>
              <span className="footer__strip-dot">·</span>
            </span>
          ))}
        </div>
      </div>

      <div className="footer__main">

        <div className="footer__brand">
          <div className="footer__logo">
            <span className="footer__logo-name">Fitzo</span>
            <span className="footer__logo-sub">STUDIO</span>
          </div>
          <p className="footer__tagline">
            Modern fashion for every occasion — crafted with quality, designed for life.
          </p>
          <div className="footer__socials">
            <a href="#" className="footer__social-btn" aria-label="Facebook"><FaFacebook /></a>
            <a href="#" className="footer__social-btn" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" className="footer__social-btn" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" className="footer__social-btn" aria-label="YouTube"><FaYoutube /></a>
          </div>
        </div>

        <div className="footer__col">
          <h4 className="footer__col-title">Shop</h4>
          <ul className="footer__links">
            <li><Link to="/new-arrivals">New Arrivals</Link></li>
            <li><Link to="/Luxury">Luxury</Link></li>
            <li><Link to="/TwoPiece">Unstitched</Link></li>
            <li><Link to="/western">Western</Link></li>
            <li><Link to="/rtw">Ready to Wear</Link></li>
            <li><Link to="/sale">Sale</Link></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__col-title">Help</h4>
          <ul className="footer__links">
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/shipping">Shipping Info</Link></li>
            <li><Link to="/returns">Returns</Link></li>
            <li><Link to="/track-order">Track Order</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        <div className="footer__col footer__newsletter">
          <h4 className="footer__col-title">Stay in the Loop</h4>
          <p className="footer__newsletter-text">
            Get exclusive deals, new arrivals and style inspiration straight to your inbox.
          </p>
          <form className="footer__form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Subscribe</button>
          </form>
          {subscribed && (
            <p className="footer__success">✓ Thank you for subscribing!</p>
          )}
          <p className="footer__contact-line">
            📧 support@fitzo.com &nbsp;·&nbsp; 📞 +92 300 1234567
          </p>
        </div>

      </div>

      <div className="footer__bottom">
        <p className="footer__copy">© 2026 Fitzo Studio. All rights reserved.</p>
        <div className="footer__bottom-links">
          <Link to="/privacy">Privacy Policy</Link>
          <span>·</span>
          <Link to="/terms">Terms of Service</Link>
        </div>
      </div>

    </footer>
  );
}

export default Footer;
