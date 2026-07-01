import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Productdetails/ProductDetail1.css";

import img1 from "../assets/Mens/dress1.webp";
import img2 from "../assets/Mens/dress2.webp";
import img3 from "../assets/Mens/dress3.webp";
import img4 from "../assets/Mens/dress4.webp";
import img5 from "../assets/Mens/dress5.webp";
import img6 from "../assets/Mens/dress6.webp";

import img1hover from "../assets/Mens/dress1hover.JPG";
import img2hover from "../assets/Mens/dress2hover.webp";
import img3hover from "../assets/Mens/dress3hover.webp";
import img4hover from "../assets/Mens/dress4hover.webp";
import img5hover from "../assets/Mens/dress5hover.webp";
import img6hover from "../assets/Mens/dress6hover.webp";

const images = [
  [img1, img1hover],
  [img2, img2hover],
  [img3, img3hover],
  [img4, img4hover],
  [img5, img5hover],
  [img6, img6hover],
];
function MenDressDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
useEffect(() => {
  fetch("http://localhost:5000/api/admin/public/products")
    .then(res => res.json())
    .then(data => {

      const menProducts = data
        .filter(p => Number(p.CategoryID) === 2)
        .map((p, index) => ({
          id: p.ProductID,
          name: p.ProductName,
          price: p.Price,
          description: p.Description || "Men collection",
          details: ["Premium Fabric", "Comfortable Fit"],
          images: images[index % images.length],
           rating: (3.5 + Math.random() * 1.5).toFixed(1), 
    reviews: Math.floor(10 + Math.random() * 90),    
        }));

      const foundProduct = menProducts.find(
        p => Number(p.id) === Number(id)
      );

      setProduct(foundProduct);

    })
    .catch(err => console.log(err));
}, [id]);  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [wishlist, setWishlist] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setQty(1);
    setActiveImg(0);
    setAdded(false);
  }, [id]);

  if (product === null) {
    return (
      <div className="pd-not-found">
        <p>Product not found</p>
        <button onClick={() => navigate("/men")}>← Back</button>
      </div>
    );
  }

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const index = cart.findIndex(item => item.id === product.id);

    if (index >= 0) {
      cart[index].quantity += qty;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: qty
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));

    setAdded(true);
    setTimeout(() => navigate("/cart"), 800);
  };

  return (
    <div className="pd-page">

      <div className="pd-breadcrumb">
        <span onClick={() => navigate("/")}>Home</span>
        <span className="pd-breadcrumb__sep">→</span>
        <span onClick={() => navigate("/men")}>Men</span>
        <span className="pd-breadcrumb__sep">→</span>
        <span className="pd-breadcrumb__current">{product.name}</span>
      </div>

       <button className="pd-back" onClick={() => navigate("/men")}>
            ← Back
          </button>


      <div className="pd-inner">

        <div className="pd-gallery">

\          <div className="pd-thumbs">
            {product.images.map((img, i) => (
              <div
                key={i}
                className={`pd-thumb ${activeImg === i ? "pd-thumb--active" : ""}`}
                onClick={() => setActiveImg(i)}
              >
                <img src={img} alt="product" />
              </div>
            ))}
          </div>

          <div className="pd-main-img-wrap">
            <img
              src={product.images[activeImg]}
              alt={product.name}
              className="pd-main-img"
            />

            {product.images.length > 1 && (
              <>
                <button
                  className="pd-arrow pd-arrow--prev"
                  onClick={() =>
                    setActiveImg(i =>
                      i === 0 ? product.images.length - 1 : i - 1
                    )
                  }
                >
                  ‹
                </button>

                <button
                  className="pd-arrow pd-arrow--next"
                  onClick={() =>
                    setActiveImg(i =>
                      i === product.images.length - 1 ? 0 : i + 1
                    )
                  }
                >
                  ›
                </button>
              </>
            )}
          </div>
        </div>

        <div className="pd-info">

          <p className="pd-info__tag">Men Collection</p>
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

          <p className="pd-info__price">
            Rs. {product.price.toLocaleString()}
          </p>

          <p className="pd-info__desc">{product.description}</p>

          <div className="pd-divider" />

          <div className="pd-details">
            <p className="pd-details__heading">Product Details</p>
            <ul className="pd-details__list">
              {product.details.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>

          <div className="pd-divider" />

          <div className="pd-qty-row">
            <p className="pd-qty-label">Quantity</p>
            <div className="pd-qty">
              <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty(q => q + 1)}>+</button>
            </div>
          </div>

          <div className="pd-actions">
            <button
              className={`pd-btn pd-btn--cart ${added ? "pd-btn--added" : ""}`}
              onClick={handleAddToCart}
            >
              {added ? "✓ Added to Cart" : "Add to Cart"}
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
      
      
    </div>
  );
}

export default MenDressDetails;