import { React,useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { Link, useNavigate } from "react-router-dom";
import "./rtwdetails.css";


import rtw1 from "../assets/RTW/rtw1hover.webp";
import rtw2 from "../assets/RTW/rtw2.webp";
import rtw3 from "../assets/RTW/rtw3.jpg";
import rtw4 from "../assets/RTW/rtw4.webp";

import rtw1hover from "../assets/RTW/rtw1.webp";
import rtw2hover from "../assets/RTW/rtw2hover.webp";
import rtw3hover from "../assets/RTW/rtw3hover.webp";
import rtw4hover from "../assets/RTW/rtw4hover.webp";

const productImages = [
  [rtw3, rtw3hover],
  [rtw1, rtw1hover],
  [rtw4, rtw4hover],
];


const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

const SIZE_CHART = [
  { size: "XS", chest: 20, length: 18, shoulder: 11 },
  { size: "S",  chest: 22, length: 20, shoulder: 12 },
  { size: "M",  chest: 24, length: 22, shoulder: 13 },
  { size: "L",  chest: 26, length: 24, shoulder: 14 },
  { size: "XL", chest: 28, length: 26, shoulder: 15 },
  { size: "XXL",chest: 30, length: 28, shoulder: 16 },
];


function RTWDetail() {
const { id } = useParams();
const navigate = useNavigate();

const [product, setProduct] = useState(null);
const [qty, setQty] = useState(1);
const [activeImg, setActiveImg] = useState(0);
const [wishlist, setWishlist] = useState(false);
const [showSizeChart, setShowSizeChart] = useState(false);
const [selectedSize, setSelectedSize] = useState(null);


useEffect(() => {
  fetch("http://localhost:5000/api/admin/public/products")
    .then(res => res.json())
    .then(data => {

      const found = data.find(
        p => String(p.ProductID) === String(id)
      );

      if (!found) {
        setProduct(null);
        return;
      }
      

      setProduct({
        id: found.ProductID,
        name: found.ProductName,
        price: found.Price,
        description: found.Description || "",
         rating: (3.5 + Math.random() * 1.5).toFixed(1), 
    reviews: Math.floor(10 + Math.random() * 90),    

        images: productImages[
          (Number(found.ProductID) - 1) % productImages.length
          
        ]
        
        
      });
      
      
    });
    
}, [id]);

  if (!product) return <h2>Product not found</h2>;

  const images = product?.images || [];
  const details = product.details || [];

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(
      item => item.id === product.id && item.size === selectedSize
    );

    if (existing) {
      existing.quantity += qty;
    } else {
      cart.push({ ...product, quantity: qty, size: selectedSize });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    navigate("/cart");
  };

  return (
    <div className="pd-page">

      <div className="pd-breadcrumb">
        <span onClick={() => navigate("/")}>Home</span>
        <span className="pd-breadcrumb__sep">→</span>
        <span onClick={() => navigate("/rtw")}>rtw</span>
        <span className="pd-breadcrumb__sep">→</span>
        <span className="pd-breadcrumb__current">{product.name}</span>
      </div>

          <button className="pd-back" onClick={() => navigate("/fabrics")}>
            ← Back
          </button>
      <div className="pd-inner">

        <div className="pd-gallery">

          <div className="pd-thumbs">
            {images.map((img, i) => (
              <div
                key={i}
                className={`pd-thumb ${activeImg === i ? "pd-thumb--active" : ""}`}
                onClick={() => setActiveImg(i)}
              >
                <img src={img} alt="" />
              </div>
            ))}
          </div>

          <div className="pd-main-img-wrap">
            <img
              src={images[activeImg]}
              className="pd-main-img"
              alt={product.name}
            />

            {images.length > 1 && (
              <>
                <button
                  className="pd-arrow pd-arrow--prev"
                  onClick={() =>
                    setActiveImg(i => (i === 0 ? images.length - 1 : i - 1))
                  }
                >
                  ‹
                </button>

                <button
                  className="pd-arrow pd-arrow--next"
                  onClick={() =>
                    setActiveImg(i => (i === images.length - 1 ? 0 : i + 1))
                  }
                >
                  ›
                </button>
              </>
            )}
          </div>
        </div>

        <div className="pd-info">
          <p className="pd-info__tag">Luxury Collection</p>
          <h1 className="pd-info__name">{product.name}</h1>

         <div className="pd-rating">
  {[1,2,3,4,5].map(s => {
    const rating = parseFloat(product.rating);
    const full = s <= Math.floor(rating);
    const partial = s === Math.ceil(rating) && !Number.isInteger(rating);
    return (
      <svg key={s} width="14" height="14" viewBox="0 0 24 24"
        fill={full ? "#c8a96e" : "none"}
        stroke="#c8a96e" strokeWidth="1.5"
        style={{ opacity: partial ? 0.5 : 1 }}
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    );
  })}
  <span className="pd-rating__count">{product.rating}/5.0</span>
</div>

          <p className="pd-info__price">Rs. {product.price}</p>
          

          {product.description && (
            <p className="pd-info__desc">{product.description}</p>
          )}


          <div className="pd-divider" />

          <ul className="pd-details__list">
            {details.map((d, i) => (
              <li key={i}>• {d}</li>
            ))}
          </ul>

          <div className="pd-divider" />

          <div className="pd-size-section">
            <div className="pd-size-header">
              <span className="pd-size-label">Choose Size</span>
              <button
                className="pd-size-chart-link"
                onClick={() => setShowSizeChart(true)}
              >
                📏 Size Chart
              </button>
            </div>

            <div className="pd-size-options">
              {SIZES.map(size => (
                <label key={size} className="pd-size-option">
                  <input
                    type="radio"
                    checked={selectedSize === size}
                    onChange={() => setSelectedSize(size)}
                  />
                  <span
                    className={`pd-size-box ${
                      selectedSize === size ? "pd-size-box--active" : ""
                    }`}
                  >
                    {size}
                  </span>
                </label>
              ))}
            </div>

            {!selectedSize && (
              <p className="pd-size-warning">* Please select a size</p>
            )}
          </div>

          <div className="pd-divider" />

        
          <div className="pd-qty-row">
            <p className="pd-qty-label">Quantity</p>
            <div className="pd-qty">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => q + 1)}>+</button>
            </div>
          </div>


          <div className="pd-actions">
            <button className="pd-btn pd-btn--cart" onClick={handleAddToCart}>
              Add to Cart
            </button>

          </div>

          <div className="pd-trust">
            <div className="pd-trust__item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="1" y="3" width="15" height="13" rx="2" />
                <path d="M16 8h4l3 5v3h-7V8z" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
              Free shipping over Rs. 5,000
            </div>
            <div className="pd-trust__item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <polyline points="23 4 23 10 17 10" />
                <polyline points="1 20 1 14 7 14" />
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
              </svg>
              Easy 7-day returns
            </div>
            <div className="pd-trust__item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Secure checkout
            </div>
          </div>

          
        </div>
      </div>

      {showSizeChart && (
        <div
          className="size-overlay"
          onClick={() => setShowSizeChart(false)}
        >
          <div
            className="size-modal"
            onClick={e => e.stopPropagation()}
          >
            <h3> Size Chart</h3>

            <table>
              <thead>
                <tr>
                  <th>Size</th>
                  <th>Chest</th>
                  <th>Length</th>
                  <th>Shoulder</th>
                </tr>
              </thead>

              <tbody>
                {SIZE_CHART.map(row => (
                  <tr
                    key={row.size}
                    className={
                      selectedSize === row.size ? "size-row--active" : ""
                    }
                  >
                    <td>{row.size}</td>
                    <td>{row.chest}</td>
                    <td>{row.length}</td>
                    <td>{row.shoulder}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              className="close-btn"
              onClick={() => setShowSizeChart(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
} export default RTWDetail;