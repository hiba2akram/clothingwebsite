import React from "react";
import video1 from "../assets/video/video1.mp4";
import './Brandvideo.css'; // make sure to import css

function Brandvideo() {
  return (
    <div className="brandvideo">
      <video src={video1} className="card-img" autoPlay loop muted />
      <div className="card-img-overlay">
        {/* Optional overlay content */}
      </div>
    </div>
  );
}

export default Brandvideo;