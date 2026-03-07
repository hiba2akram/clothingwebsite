import React from "react";
import banner from "../assets/images/banner1.webp";
import banner1 from "../assets/video/banner2.mp4";

import './Carousel.css';
// import banners from "../assets/images/banner2.webp";



function CarouselComponent(){
    return(
       <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src={banner} className="d-block w-100" alt="banner" style={{width : "100%"} }/>
    </div>


    <div className="carousel-item">
      <video className="d-block w-100" autoPlay loop muted>
        <source src={banner1} type="video/mp4"/>
        Your browser does not support the video tag.
      </video>
    </div>


    <div className="carousel-item">
      <img src="..." className="d-block w-100" alt="..."/>
    </div>
  </div>


  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>

    );

}

export default CarouselComponent;