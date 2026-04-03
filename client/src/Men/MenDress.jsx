import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./MenDress.css"

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
  

function MenDress() {
  const navigate = useNavigate();

  const [sortOption, setSortOption] = useState("");

  const productsData = [
    { id: "m1", name: "Fitzo Printed Shirt", price: 2500, oldPrice: 3000, description: "Printed lawn shirt", img1: img1, img2: img1hover },
    { id: "m2", name: "Fitzo Lawn Shirt", price: 2700, oldPrice: 3200, description: "Lawn summer collection", img1: img2, img2: img2hover},
    { id: "m3", name: "Fitzo Summer Shirt", price: 2600, oldPrice: 3100, description: "Light summer wear", img1: img3, img2: img3hover},
    { id: "m4", name: "Fitzo Elegant Shirt", price: 2600, oldPrice: 3000, description: "Elegant stitched shirt", img1: img4, img2: img4hover },
    { id: "m5", name: "Fitzo Casual Shirt", price: 2400, oldPrice: 2900, description: "Casual everyday wear", img1: img5, img2: img5hover },
    { id: "m6", name: "Fitzo Formal Shirt", price: 2800, oldPrice: 3300, description: "Formal premium shirt", img1: img6, img2: img6hover },
  ];

  // SORTING LOGIC
  const sortedProducts = [...productsData].sort((a, b) => {
    if (sortOption === "low") return a.price - b.price;
    if (sortOption === "high") return b.price - a.price;
    return 0;
  });

  const handleAddToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/cart");
  };

  const handleQuickView = (product) => {
    alert(`${product.name}\n\n${product.description}`);
  };

  return (
    <>
      <h1 className="heading text-center my-4">Men's Collection</h1>

      {/* SORT DROPDOWN */}
      <div className="container d-flex justify-content-end">
        <select
          className="form-select w-25 mb-4"
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>

      <div className="container">
        <div className="row g-4">
          {sortedProducts.map(product => (
            <div className="col-lg-4 col-md-6 col-sm-12" key={product.id}>
              <div className="card product-card">

                {/* <span className="badge bg-danger sale-badge">Sale</span> */}

                {/* WISHLIST */}
                <div
                  className="wishlist"
                  onClick={() => alert("Added to wishlist ❤️")}
                >
                  ❤️
                </div>

                {/* PRODUCT IMAGE + LINK */}
                <Link to={`/men/${product.id}`}>
                  <div className="img-container">
                    <img src={product.img1} className="product-img main-img" alt={product.name} />
                    <img src={product.img2} className="product-img hover-img" alt={product.name} />
                  </div>
                 </Link> 

                <div className="card-body text-center">
                  <h5>{product.name}</h5>

                  <div className="rating">⭐⭐⭐⭐☆</div>

                  <p className="price">
                    <span className="new-price">Rs.{product.price}</span>
                    <span className="old-price">Rs.{product.oldPrice}</span>
                  </p>

                  <button
                    className="btn btn-dark w-100"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>

                  <button
                    className="btn btn-outline-secondary w-100 mt-2"
                    onClick={() => handleQuickView(product)}
                  >
                    Quick View
                  </button>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MenDress;