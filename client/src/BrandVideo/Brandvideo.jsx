import React, { useRef, useState } from "react";
import video1 from "../assets/video/promo2.mp4";
import { useNavigate } from "react-router-dom";
import "./Brandvideo.css";

function Brandvideo() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    videoRef.current.muted = !videoRef.current.muted;
    setMuted(!muted);
  };

  return (
    <section className="bv-section">

      <video
        ref={videoRef}
        src={video1}
        className="bv-video"
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="bv-overlay" />

      <div className="bv-content">

        <span className="bv-tag">Fitzo Studio — 2026 Collection</span>

        <h1 className="bv-heading">
          Discover the <br />
          <em>Essence of Elegance</em>
        </h1>

        <p className="bv-text">
          Premium fabrics crafted for perfection — designed to inspire
          confidence, sophistication, and timeless style.
        </p>

        <div className="bv-actions">
          <button className="bv-btn bv-btn--primary" onClick={() => navigate("/fabrics")}>
            Explore Collection
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
          {/* <button className="bv-btn bv-btn--outline" onClick={() => navigate("/new-arrivals")}>
            New Arrivals
          </button> */}
        </div>

        <div className="bv-stats">
          <div className="bv-stat">
            <span className="bv-stat__num">500+</span>
            <span className="bv-stat__label">Products</span>
          </div>
          <div className="bv-stat__divider" />
          <div className="bv-stat">
            <span className="bv-stat__num">12K+</span>
            <span className="bv-stat__label">Happy Customers</span>
          </div>
          <div className="bv-stat__divider" />
          <div className="bv-stat">
            <span className="bv-stat__num">6</span>
            <span className="bv-stat__label">Collections</span>
          </div>
        </div>

      </div>

      <button className="bv-mute" onClick={toggleMute} aria-label="Toggle sound">
        {muted ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        )}
      </button>

      <div className="bv-scroll">
        <span>Scroll</span>
        <div className="bv-scroll__line" />
      </div>

    </section>
  );
}

export default Brandvideo;