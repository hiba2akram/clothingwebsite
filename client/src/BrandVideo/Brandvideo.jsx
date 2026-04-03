import React from "react";
import video1 from "../assets/video/promo2.mp4";
import { useNavigate } from "react-router-dom";

import './Brandvideo.css';

function Brandvideo() {
  const navigate = useNavigate();

  const goToOnePiece = () => {
    navigate("/onepiece");
  };
  return (
    <div className="brandvideo">
      <div className="video-wrapper">
        <video src={video1} className="video" autoPlay loop muted />
      </div>

      <div className="right-content">
        <h2 className="brand-heading">Discover the Essence of Elegance</h2>
        <p>Experience premium quality and style in every frame.</p>
        <button onClick={goToOnePiece}>Learn More</button>
      </div>
    </div>
  );
}

export default Brandvideo;