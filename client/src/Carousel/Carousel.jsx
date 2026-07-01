import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import banner1 from "../assets/images/banner1.webp";
import banner2 from "../assets/images/logo2.webp";
import banner3 from "../assets/images/logo3.webp";
import "./Carousel.css";

const slides = [
  {
    img: banner1,
    tag: "New Collection",
    title: "Women's Latest Wear",
    sub: "Explore the finest unstitched & stitched collections this season",
    btn: "Shop Women",
    route: "/fabrics",
    align: "left",
  },
  {
    img: banner2,
    tag: "Men's Edit",
    title: "Men's Collection",
    sub: "Premium kurtas, formal & casual wear crafted for the modern man",
    btn: "Shop Men",
    route: "/men",
    align: "left",
  },
  {
    img: banner3,
    tag: "For Little Ones",
    title: "Kids Collection",
    sub: "Adorable styles for every occasion — comfort meets fashion",
    btn: "Shop Kids",
    route: "/Kids",
    align: "left",
  },
];

function CarouselComponent() {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => goTo((active + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, [active]);

  const goTo = (index) => {
    if (animating || index === active) return;
    setAnimating(true);
    setTimeout(() => {
      setActive(index);
      setAnimating(false);
    }, 400);
  };

  const prev = () => goTo((active - 1 + slides.length) % slides.length);
  const next = () => goTo((active + 1) % slides.length);

  const slide = slides[active];

  return (
    <div className="carousel-wrap">

      <div className={`carousel-slide ${animating ? "carousel-slide--fade-out" : "carousel-slide--fade-in"}`}>
        <img src={slide.img} alt={slide.title} className="carousel-slide__img" />
        <div className="carousel-slide__overlay" />

        <div className={`carousel-caption-box carousel-caption-box--${slide.align}`}>
          <span className="carousel-tag">{slide.tag}</span>
          <h2 className="carousel-title">{slide.title}</h2>
          <p className="carousel-sub">{slide.sub}</p>
          <button className="carousel-btn" onClick={() => navigate(slide.route)}>
            {slide.btn}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>

      <button className="carousel-arrow carousel-arrow--prev" onClick={prev} aria-label="Previous">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button className="carousel-arrow carousel-arrow--next" onClick={next} aria-label="Next">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      <div className="carousel-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`carousel-dot ${i === active ? "carousel-dot--active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      
      <div className="carousel-counter">
        <span>{String(active + 1).padStart(2, "0")}</span>
        <span className="carousel-counter__sep" />
        <span>{String(slides.length).padStart(2, "0")}</span>
      </div>

    </div>
  );
}

export default CarouselComponent;
