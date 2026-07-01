

import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./fabrics.css";

import img1 from "../assets/images/twopiece1.webp";
import img2 from "../assets/images/twopiece2.webp";
import img3 from "../assets/images/twopiece3.webp";
import img4 from "../assets/images/twopiece4.webp";
import img5 from "../assets/images/unstitched.webp";
import img6 from "../assets/images/onepiece6.webp";
import festive from "../assets/images/festive.webp";
import west from "../assets/images/west.webp";
import rtw from "../assets/images/rtw.webp";

import img1hover from "../assets/images/img1hover.webp";
import img2hover from "../assets/images/img2hover.JPG";
import img3hover from "../assets/images/img3hover.webp";
import img4hover from "../assets/images/img4hover.JPG";
import img5hover from "../assets/images/unstitchedhover.webp";
import img6hover from "../assets/images/6hover.webp";

const productImages = [
  [img1, img1hover],
  [img2, img2hover],
  [img3, img3hover],
  [img4, img4hover],
  [img5, img5hover],
  [img6, img6hover],
];

const categories = [
  { label: "Luxury",      img: festive, route: "/Luxury"   },
  // { label: "Western",     img: west,    route: "/western"  },
  { label: "Unstitched",  img: img2,    route: "/TwoPiece" },
  { label: "RTW",         img: rtw,     route: "/rtw"      },
];

function TwoPiece() {
  const navigate = useNavigate();
   
 
   const [products, setProducts] = useState([]);
   const [sortBy, setSortBy] = useState("default");
    const [allProducts, setAllProducts] = useState([]);
    const [wishlist, setWishlist] = useState(() => {
  const saved = JSON.parse(localStorage.getItem("wishlist")) || [];
  return saved.map(item => item.id);
});
 

   useEffect(() => {
  fetch("http://localhost:5000/api/admin/public/products")
    .then(res => res.json())
    .then(data => {

      console.log("API DATA:", data); 

      const twoPieceProducts = data
        .filter(p => p.CategoryID && Number(p.CategoryID) === 3)
        .map((p, index) => ({
          id: p.ProductID,
          name: p.ProductName,
          price: p.Price,
          img: productImages[index % productImages.length][0],
          hoverImg: productImages[index % productImages.length][1],
          
        }));

      setProducts(twoPieceProducts);
      setAllProducts(twoPieceProducts); 
    });
}, []);
 useEffect(() => {
  let sorted = [...allProducts];

  if (sortBy === "low") sorted.sort((a, b) => a.price - b.price);
  if (sortBy === "high") sorted.sort((a, b) => b.price - a.price);

  setProducts(sorted);
}, [sortBy, allProducts]);

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
        <h1 className="fp-header__title">Unstitched Collection</h1>
        <p className="fp-header__sub">Handpicked fabrics for every occasion — discover this season's finest</p>
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
          onChange={e => setSortBy(e.target.value)}
        >
          <option value="default">Sort by: Featured</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>

      <div className="fp-grid">
        {products.map(product => (
          <div className="fp-card" key={product.id}>

            <Link to={`/fabrics/${product.id}`} className="fp-card__img-wrap">
              <img
                src={product.img}
                className="fp-card__img fp-card__img--main"
                alt={product.name}
              />

              <img
                src={product.hoverImg}
                className="fp-card__img fp-card__img--hover"
                alt={product.name}
              />

             
                           <button
                className="fp-quick-add"
                onClick={e => {
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
{/* 
  <div className="fp-card__rating">
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
  );
}

export default TwoPiece;