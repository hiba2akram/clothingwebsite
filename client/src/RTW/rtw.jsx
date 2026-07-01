

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./rtw.css";

import rtw1 from "../assets/RTW/rtw1hover.webp";
import rtw3 from "../assets/RTW/rtw3.jpg";
import rtw4 from "../assets/RTW/rtw4.webp";

import rtw1hover from "../assets/RTW/rtw1.webp";
import rtw3hover from "../assets/RTW/rtw3hover.webp";
import rtw4hover from "../assets/RTW/rtw4hover.webp";

import unstitchedImg from "../assets/images/twopiece2.webp";
import festive from "../assets/images/festive.webp";
import west from "../assets/images/west.webp";
import rtw from "../assets/images/rtw.webp";

const productImages = [
  [rtw1, rtw1hover],
  [rtw3, rtw3hover],
  [rtw4, rtw4hover],
];

const categories = [
  { label: "Luxury", img: festive, route: "/Luxury" },
  { label: "Unstitched", img: unstitchedImg, route: "/TwoPiece" },
  { label: "RTW", img: rtw, route: "/" },
];
function RTW() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("default");
const [wishlist, setWishlist] = useState(() => {
  const saved = JSON.parse(localStorage.getItem("wishlist")) || [];
  return saved.map(item => item.id);
});
  useEffect(() => {
    fetch("http://localhost:5000/api/admin/public/products")
      .then(res => res.json())
      .then(data => {

        const rtwProducts = data
          .filter(p => Number(p.CategoryID) === 7)

          .map((p, index) => ({
            id: p.ProductID,
            name: p.ProductName,
            price: p.Price,
            img: productImages[index % productImages.length][0],
            hoverImg: productImages[index % productImages.length][1],
         
          }));

        setProducts(rtwProducts);
      });
  }, []);

  useEffect(() => {
    let sorted = [...products];

    if (sortBy === "low") sorted.sort((a, b) => a.price - b.price);
    if (sortBy === "high") sorted.sort((a, b) => b.price - a.price);

    setProducts(sorted);
  }, [sortBy]);

  const handleAddToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    navigate("/cart");
  };

 const toggleWishlist = (id, product) => {
  const saved = JSON.parse(localStorage.getItem("wishlist")) || [];

  const isInWishlist = wishlist.includes(id);

  let updated;
  if (isInWishlist) {
    updated = saved.filter(item => item.id !== id);
  } else {
    updated = [...saved, {
      id: product.id,
      name: product.name,
      price: product.price,
      img: product.img,
    }];
  }

  localStorage.setItem("wishlist", JSON.stringify(updated));
  console.log("product.img =", product.img); 
    window.dispatchEvent(new Event("wishlistUpdated")); 

  setWishlist(updated.map(item => item.id));
};

  return (
    <div className="fp-page">

      <div className="fp-header">
        <p className="fp-header__tag">Women's Edit</p>
        <h1 className="fp-header__title">Luxury Collection</h1>
        <p className="fp-header__sub">
          Handpicked fabrics for every occasion — discover this season's finest
        </p>
      </div>

      
      <div className="fp-categories">
        {categories.map(cat => (
          <div key={cat.label} className="fp-cat" onClick={() => navigate(cat.route)}>
            <div className="fp-cat__img-wrap">
              <img src={cat.img} alt={cat.label} />
            </div>
            <p className="fp-cat__label">{cat.label}</p>
          </div>
        ))}
      </div>

      <div className="fp-toolbar">
        <p className="fp-toolbar__count">{products.length} Products</p>

        <select
          className="fp-sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="default">Sort by: Featured</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>

      <div className="fp-grid">
        {products.map(product => (
          <div className="fp-card" key={product.id}>

            <Link to={`/rtw/${product.id}`} className="fp-card__img-wrap">

              <img src={product.img} className="fp-card__img fp-card__img--main" alt={product.name} />
              <img src={product.hoverImg} className="fp-card__img fp-card__img--hover" alt={product.name} />

              <button
                className={`fp-wishlist ${wishlist.includes(product.id) ? "fp-wishlist--active" : ""}`}
                  onClick={e => {
  e.preventDefault();
  toggleWishlist(product.id, product); 
}}
                aria-label="Wishlist"
              >
                <svg width="16" height="16" viewBox="0 0 24 24"
                  fill={wishlist.includes(product.id) ? "currentColor" : "none"}
                  stroke="currentColor" strokeWidth="1.8">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>

              <button
                className="fp-quick-add"
                onClick={(e) => {
                  e.preventDefault();
                  handleAddToCart(product);
                }}
              >
                Quick Add
              </button>

            </Link>

          <div className="fp-card__info">

  <h3 className="fp-card__name">
    {product.name}
  </h3>

  {/* <div className="fp-card__rating">
    <div className="fp-rating__stars">
      {[1,2,3,4,5].map(s => {
        const rating = parseFloat(product.rating);
        const full = s <= Math.floor(rating);
        const partial = s === Math.ceil(rating) && !Number.isInteger(rating);
        return (
          <svg key={s} width="11" height="11" viewBox="0 0 24 24"
            fill={full ? "#c8a96e" : "none"}
            stroke="#c8a96e" strokeWidth="1.5"
            style={{ opacity: partial ? 0.5 : 1 }}
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        );
      })}
    </div>
    <span className="fp-rating__text">{product.rating}/5.0</span>
  </div> */}

              <div className="fp-card__prices">

                <span className="fp-card__price">
                  Rs. {Number(product.price).toLocaleString()}
                </span>

              </div>

              <button
                className="fp-card__btn"
                onClick={() =>
                  handleAddToCart(product)
                }
              >
                Add to Cart
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

export default RTW;
