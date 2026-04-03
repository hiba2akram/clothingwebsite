import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./KidsDetail.css";


import img1 from "../assets/kids/img1.webp";
import img2 from "../assets/kids/img2.webp";
import img3 from "../assets/kids/img3.webp";
import img4 from "../assets/kids/img4.webp";
import img5 from "../assets/kids/img5.webp";
import img6 from "../assets/kids/img6.webp";

import img1hover from "../assets/kids/img1hover.jpg";
import img2hover from "../assets/kids/img3hover.jpg";
import img3hover from "../assets/kids/img4hover.webp";
import img4hover from "../assets/kids/img2hover.webp";
import img5hover from "../assets/kids/img5hover.webp";
import img6hover from "../assets/kids/img6hover.webp";


const products = [
  {
    id: "k1",
    name: "Shalwar Kameez",
    price: 2500,
    images: [img1, img1hover],
    description: "A stylish printed shirt crafted from high-quality cotton, designed for all-day comfort and a modern casual look.",
    details: [
      "Soft premium cotton fabric",
      "Breathable and lightweight",
      
     
      "Perfect for casual and semi-formal wear"
    ]
  },
  {
    id: "k2",
    name: "Shalwar Kameez",
    price: 2700,
    images: [img2, img2hover],
    description: "An elegant lawn shirt tailored for a refined look, ideal for warm weather and formal gatherings.",
    details: [
      "Premium lawn fabric",
      "Highly breathable material",
      
      "Soft and smooth texture",
      "Ideal for formal occasions"
    ]
  },
  {
    id: "k3",
    name: "Shalwar Kameez",
    price: 2300,
    images: [img3, img3hover],
    description: "A versatile casual shirt designed for everyday wear, combining comfort with a sleek modern fit.",
    details: [
      "High-quality cotton fabric",
      "Slim fit design",
      "Machine washable",
     
      "Durable stitching",
      "Perfect for daily use"
    ]
  },
  {
    id: "k4",
    name: "Shalwar Kameez",
    price: 3000,
    images: [img4, img4hover],
    description: "A premium formal shirt tailored for a sharp and professional appearance, ideal for office and business wear.",
    details: [
      "Wool blend fabric",
      "Tailored fit",
      "Wrinkle-resistant",
      
      "Light ironing required",
      "Office & meetings wear"
    ]
  },
  {
    id: "k5",
    name: "Shalwar Kameez",
    price: 3500,
    images: [img5, img5hover],
    description: "A unique designer shirt featuring exclusive patterns, crafted for those who want to stand out with style.",
    details: [
      "Premium Lawn fabric",
      "Regular fit",
      "Soft & comfortable",
            "Hand wash recommended",
      "Trendy design"
    ]
  },
  {
    id: "k6",
    name: "Shalwar Kameez",
    price: 4000,
    images: [img6, img6hover],
    description: "An ultra-premium shirt made with luxury fabric, offering unmatched comfort, elegance, and durability.",
    details: [
      "Luxury-grade fabric",
      "Custom fit finish",
      "Ultra-soft texture",
      "Dry clean recommended",
      "Premium occasions wear"
    ]
  }
];

function KidsDetail() {
    const { id } = useParams();
      const navigate = useNavigate();
    
      const product = products.find(p => p.id === id);
    
      const [qty, setQty] = useState(1);
      const [currentImgIndex, setCurrentImgIndex] = useState(0);
    
      const [selectedSize, setSelectedSize] = useState("M");
      const [showSizeChart, setShowSizeChart] = useState(false);
    
      if (!product) return <h2>Product not found</h2>;
    
      const images = product.images || [];
    
      const increaseQty = () => setQty(qty + 1);
      const decreaseQty = () => {
        if (qty > 1) setQty(qty - 1);
      };
    
      const handleAddToCart = () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
    
        const existingIndex = cart.findIndex(
          item => item.id === product.id && item.size === selectedSize
        );
    
        const productToAdd = {
          ...product,
          quantity: qty,
          size: selectedSize
        };
    
        if (existingIndex >= 0) {
          cart[existingIndex].quantity += qty;
        } else {
          cart.push(productToAdd);
        }
    
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Added to cart!");
        navigate("/cart");
      };
    
      const prevImage = () => {
        setCurrentImgIndex(prev =>
          prev === 0 ? images.length - 1 : prev - 1
        );
      };
    
      const nextImage = () => {
        setCurrentImgIndex(prev =>
          prev === images.length - 1 ? 0 : prev + 1
        );
      };
    
      return (
        <div className="container mt-5">
          <div className="row g-4">
    
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
    
            <div className="col-md-6">
              <h2>{product.name}</h2>
              <h4 className="price">Rs. {product.price}</h4>
              <p>{product.description}</p>
    
              <div className="product-details mb-3">
                {product.details.map((item, index) => (
                  <p key={index}>• {item}</p>
                ))}
              </div>
    
              <div className="mb-3">
                <h6>Select Size:</h6>
                <div className="d-flex gap-2 flex-wrap">
                  {["S", "M", "L", "XL", "XXL"].map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`btn btn-sm ${
                        selectedSize === size
                          ? "btn-dark"
                          : "btn-outline-dark"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
    
                <button
                  className="btn btn-link mt-2 p-0"
                  onClick={() => setShowSizeChart(true)}
                >
                  View Size Chart
                </button>
              </div>
    
              {/* QUANTITY */}
              <div className="quantity-container">
                <button className="qty-btn" onClick={decreaseQty}>−</button>
                <span className="qty-value">{qty}</span>
                <button className="qty-btn" onClick={increaseQty}>+</button>
              </div>
    
              {/* ADD TO CART */}
              <button className="add-cart-btn mt-3" onClick={handleAddToCart}>
                Add to Cart
              </button>
    
              {/* BACK */}
              <button
                className="btn btn-secondary mt-2"
                onClick={() => navigate("/Kids")}
              >
                ← Back
              </button>
            </div>
          </div>
    
          {showSizeChart && (
            <div className="size-modal-overlay" onClick={() => setShowSizeChart(false)}>
              <div className="size-modal" onClick={(e) => e.stopPropagation()}>
                <h4>Kid's Size Chart</h4>
    
                <table className="table table-bordered mt-3">
                  <thead>
                    <tr>
                      <th>Size</th>
                      <th>Chest</th>
                      <th>Length</th>
                      <th>Shoulder</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>S</td><td>38</td><td>40</td><td>16</td></tr>
                    <tr><td>M</td><td>40</td><td>41</td><td>17</td></tr>
                    <tr><td>L</td><td>42</td><td>42</td><td>18</td></tr>
                    <tr><td>XL</td><td>44</td><td>43</td><td>19</td></tr>
                    <tr><td>XXL</td><td>46</td><td>44</td><td>20</td></tr>
                  </tbody>
                </table>
    
                <button
                  className="btn btn-dark mt-2"
                  onClick={() => setShowSizeChart(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      );
    }

    export default KidsDetail;