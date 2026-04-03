import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FootwearData } from "./footwear";
import "./footwear.css";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = FootwearData.find(p => p.id === parseInt(id));
  const [qty, setQty] = useState(1);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  if (!product) return <h2>Product not found</h2>;

  // Ensure images is always an array
  const images = product.images
    ? Array.isArray(product.images)
      ? product.images
      : [product.images]
    : [product.img]; // fallback to single img

  const increaseQty = () => setQty(qty + 1);
  const decreaseQty = () => {
    if (qty > 1) setQty(qty - 1);
  };

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = cart.findIndex(item => item.id === product.id);

    if (existingIndex >= 0) {
      cart[existingIndex].quantity += qty;
    } else {
      cart.push({ ...product, quantity: qty });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
    navigate("/cart");
  };

  // Image slider functions
  const prevImage = () => {
    setCurrentImgIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setCurrentImgIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="container mt-5">
      <div className="row g-4">

        {/* LEFT IMAGE SLIDER */}
        <div className="col-md-6 text-center position-relative">
          {images.length > 1 && (
            <button className="img-nav prev" onClick={prevImage}>&lt;</button>
          )}
          
          <img
            src={images[currentImgIndex]}
            alt={product.name}
            className="product-main-image"
          />
          
          {images.length > 1 && (
            <button className="img-nav next" onClick={nextImage}>&gt;</button>
          )}
        </div>

        {/* RIGHT INFO */}
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <h4 className="price">Rs. {product.price}</h4>
          <p>{product.description}</p>

          {/* QUANTITY SELECTOR */}
          <div className="quantity-container">
            <button className="qty-btn left" onClick={decreaseQty}>−</button>
            <span className="qty-value">{qty}</span>
            <button className="qty-btn right" onClick={increaseQty}>+</button>
          </div>

          {/* ADD TO CART */}
          <button className="add-cart-btn mt-3" onClick={addToCart}>
            Add to Cart
          </button>
        </div>

      </div>
    </div>
  );
}

export default ProductDetail;