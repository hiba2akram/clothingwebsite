import React, { useState, useEffect } from "react";
import banner1 from "../assets/images/banner1.webp";
import banner2 from "../assets/images/logo2.webp";
import banner3 from "../assets/images/logo3.webp";
import "./Carousel.css";
import Navbar from "../components/Navbar";

function CarouselComponent() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const carousel = document.getElementById("carouselExampleFade");
    const handleSlide = (e) => {
      setActiveSlide(e.to);
    };
    carousel.addEventListener("slid.bs.carousel", handleSlide);

    return () => {
      carousel.removeEventListener("slid.bs.carousel", handleSlide);
    };
  }, []);

  const slideColors = [
    { brand: "black", icon: "black" }, // banner1
    { brand: "black", icon: "black" }, // banner2
    { brand: "white", icon: "white" } // banner3
  ];

  const currentColors = slideColors[activeSlide];

  return (
    <>
      <Navbar brandColor={currentColors.brand} iconColor={currentColors.icon} />

      {/* Carousel */}
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={banner1}
              className="d-block w-100 carousel-img"
              alt="banner1"
            />
          </div>

          <div className="carousel-item">
            <img
              src={banner2}
              className="d-block w-100 carousel-img"
              alt="banner2"
            />
          </div>

          <div className="carousel-item">
            <img
              src={banner3}
              className="d-block w-100 carousel-img banner3-fix"
              alt="banner3"
            />
            <h3 className="carousel-caption">Explore Kids Collection</h3>
           
          </div>
        </div>

        {/* Carousel controls */}
        <button
          className="carousel-control-prev"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>

        <button
          className="carousel-control-next"
          data-bs-target="#carouselExampleFade"
      
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
    </>
  );
}

export default CarouselComponent;