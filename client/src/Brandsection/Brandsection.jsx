
import React, { useEffect, useRef, useState } from "react";
import "./Brandsection.css";
import { useNavigate } from "react-router-dom";

import womenImg    from "../assets/images/img2hover.JPG";
import menImg      from "../assets/images/card2.webp";
import kidsImg     from "../assets/images/kids.webp";
import footwearImg from "../assets/images/footwear1.webp";

const categories = [
  { name: "Women",    desc: "Ethnic & Contemporary", tag: "New Season", img: womenImg,    path: "/fabrics"  },
  { name: "Men",      desc: "Kurtas & Formal Suits", tag: "Essentials", img: menImg,      path: "/men"      },
  { name: "Kids",     desc: "Festive & Casual",      tag: "Mini Edit",  img: kidsImg,     path: "/kids"     },
  { name: "Footwear", desc: "Khussa & Flats",        tag: "Step Up",    img: footwearImg, path: "/footwear" },
];

function Brandsection() {
  const navigate   = useNavigate();
  const sectionRef = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  return (
    <div ref={sectionRef} className={`brand-section ${isVisible ? "show" : ""}`}>

      <div className="brand-header">
        <span className="brand-eyebrow">Our Collections</span>
        <h2 className="brand-title">
          Dress for Every <em>Moment</em>
        </h2>
        <p className="brand-description">
          Handpicked styles for every occasion — from festive elegance to everyday ease.
        </p>
        <div className="brand-divider" />
      </div>

      <div className="category-section">
        {categories.map((cat, i) => (
          <div
            key={i}
            className="category-card"
            onClick={() => navigate(cat.path)}
          >
            <div className="category-img">
              <img src={cat.img} alt={cat.name} />
            </div>
            <div className="category-overlay">
              <span className="category-tag">{cat.tag}</span>
              <h3 className="category-name">{cat.name}</h3>
              <p className="category-desc">{cat.desc}</p>
              <button
                className="category-btn"
                onClick={(e) => { e.stopPropagation(); navigate(cat.path); }}
              >
                Shop Now <span className="btn-arrow">→</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Brandsection;

