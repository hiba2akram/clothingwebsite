import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { allProducts } from "./footwear";

import "./ProductDetail.css";
import f1 from "../assets/footwear/footwear1.webp";
import hover1 from "../assets/footwear/footwear1(2).webp";
import f2 from "../assets/footwear/footwear2.webp";
import hover2 from "../assets/footwear/footwear2(1).webp";
import f3 from "../assets/footwear/footwear3.webp";
import hover3 from "../assets/footwear/footwear3(1).webp";
import f4 from "../assets/footwear/footwear4.webp";
import hover4 from "../assets/footwear/footwear4(1).webp";

const productImages = [
  [f1, hover1],
  [f2, hover2],
  [f3, hover3],
  [f4, hover4],
  
];

const SHOE_SIZES = [38, 39, 40, 41, 42, 43, 44, 45];

function ProductDetail() {
 
const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  

  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [wishlist, setWishlist] = useState(false);
  const [added, setAdded] = useState(false);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
const [sizeError, setSizeError] = useState(false);

const images = product?.images || [];


useEffect(() => {
  fetch("http://localhost:5000/api/admin/public/products")
    .then(res => res.json())
    .then(data => {

      const footwearProducts = data
        .filter(p => Number(p.CategoryID) === 4)
        .map((p, index) => ({
          id: p.ProductID,
          name: p.ProductName,
          price: p.Price,
          description: p.Description || "",
          images: productImages[index % productImages.length],
           rating: (3.5 + Math.random() * 1.5).toFixed(1), 
    reviews: Math.floor(10 + Math.random() * 90),    
        }));

      const foundProduct = footwearProducts.find(
        p => Number(p.id) === Number(id)
      );

      setProduct(foundProduct || null);
    })
    .catch(err => console.log(err));
}, [id]);



  if (!product) {
    return (
      <div className="pd-not-found">
        <p>Product not found</p>
        <button onClick={() => navigate("/footwear")}>
          ← Back to Collection
        </button>
      </div>
    );
  }

 

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setSizeError(false);
  };

  const handleAddToCart = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingIndex = cart.findIndex(item => item.id === product.id); 

  if (existingIndex >= 0) {
    cart[existingIndex].quantity += qty;
  } else {
    cart.push({
      id: product.id,            
      name: product.name,
      price: product.price,
      quantity: qty,
      img: product.images?.[0] || "", 
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
        <span onClick={() => navigate("/footwear")}>Footwear</span>
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
                <img src={img} alt={`${product.name} view ${i + 1}`} />
              </div>
            ))}
          </div>

          <div className="pd-main-img-wrap">
            <img
              src={images[activeImg]}
              alt={product.name}
              className="pd-main-img"
            />

            {images.length > 1 && (
              <>
                <button
                  className="pd-arrow pd-arrow--prev"
                  onClick={() =>
                    setActiveImg((i) =>
                      i === 0 ? images.length - 1 : i - 1
                    )
                  }
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button
                  className="pd-arrow pd-arrow--next"
                  onClick={() =>
                    setActiveImg((i) =>
                      i === images.length - 1 ? 0 : i + 1
                    )
                  }
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>

        <div className="pd-info">

          <p className="pd-info__tag">New Arrival</p>
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

          <p className="pd-info__price">Rs. {product.price?.toLocaleString()}</p>

          {product.description && (
            <p className="pd-info__desc">{product.description}</p>
          )}

          <div className="pd-divider" />

          <div className="pd-size-section">
            <div className="pd-size-header">
              <p className="pd-section-label">Select Size (EU)</p>
              {sizeError && (
                <span className="pd-size-error">Please select a size</span>
              )}
            </div>
            <div className="pd-sizes">
              {SHOE_SIZES.map((size) => (
                <button
                  key={size}
                  className={`pd-size-btn ${selectedSize === size ? "pd-size-btn--active" : ""}`}
                  onClick={() => handleSizeSelect(size)}
                >
                  {size}
                </button>
              ))}
            </div>
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

export default ProductDetail;
