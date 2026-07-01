import React, { useEffect, useRef, useState } from "react";
import "./FeaturedProducts.css";

const features = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    title: "Crafted with Love",
    desc: "Every piece is carefully handpicked and quality-checked before reaching you.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <rect x="1" y="3" width="15" height="13" rx="2" />
        <path d="M16 8h4l3 5v3h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    title: "Free Shipping",
    desc: "Enjoy free delivery on all orders over Rs. 5,000 across Pakistan.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <polyline points="23 4 23 10 17 10" />
        <polyline points="1 20 1 14 7 14" />
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
      </svg>
    ),
    title: "Easy 7-Day Returns",
    desc: "Not satisfied? Return within 7 days — no questions asked, full refund guaranteed.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: "Secure Payments",
    desc: "Your payment information is always encrypted and 100% secure.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: "24/7 Support",
    desc: "Our friendly team is always ready to help you via chat, email or phone.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: "Premium Quality",
    desc: "We source only the finest fabrics — lawn, silk, chiffon and more.",
  },
];

function FeaturedProducts() {
  const [visibleCards, setVisibleCards] = useState([]);

  useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        features.forEach((_, i) => {
          setTimeout(() => {
            setVisibleCards(prev => [...prev, i]);
          }, i * 150);
        });
        observer.disconnect();
      }
    },
    { threshold: 0.1 }
  );

  const section = document.querySelector(".wcu-section");
  if (section) observer.observe(section);

  return () => observer.disconnect();
}, []);
  return (
    <section className="wcu-section">

      <div className="wcu-header">
        <span className="wcu-tag">Why Fitzo</span>
        <h2 className="wcu-title">The Fitzo <em>Difference</em></h2>
        <p className="wcu-sub">We go beyond fashion — here's what makes us your trusted style partner.</p>
        <div className="wcu-divider" />
      </div>

      <div className="wcu-grid">
        {features.map((f, i) => (
          <div
            className={`wcu-card ${visibleCards.includes(i) ? "wcu-card--visible" : ""}`}
            key={i}
          >
            <div className="wcu-card__icon">{f.icon}</div>
            <h3 className="wcu-card__title">{f.title}</h3>
            <p className="wcu-card__desc">{f.desc}</p>
          </div>
        ))}
      </div>

    </section>
  
  );
}

export default FeaturedProducts;
