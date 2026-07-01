

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./MenDress.css";

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

function MenDress() {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const [sortBy, setSortBy] = useState("default");
const [wishlist, setWishlist] = useState(() => {
  const saved = JSON.parse(localStorage.getItem("wishlist")) || [];
  return saved.map(item => item.id);
});
 useEffect(() => {
  fetch("http://localhost:5000/api/admin/public/products")
    .then(res => res.json())
    .then(data => {

      const menProducts = data
        .filter(p => Number(p.CategoryID) === 2)
        .slice(0, 6)
        .map((p, index) => ({
          id: p.ProductID,
          name: p.ProductName,
          price: p.Price,
          description: p.Description || "Men collection",
          img: images[index % images.length][0],      
          hoverImg: images[index % images.length][1], 
          // rating: (3.5 + Math.random() * 1.5).toFixed(1),    
          // reviews: Math.floor(10 + Math.random() * 90),       
        }));

      setAllProducts(menProducts);
      setProducts(menProducts);
    })
    .catch(err => console.log(err));
}, []);

  useEffect(() => {

    let sorted = [...allProducts];

    if (sortBy === "low") {

      sorted.sort((a, b) => a.price - b.price);

    } else if (sortBy === "high") {

      sorted.sort((a, b) => b.price - a.price);
    }

    setProducts(sorted);

  }, [sortBy, allProducts]);

  const handleAddToCart = (product) => {

    let cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(
      item => item.id === product.id
    );

    if (existing) {

      existing.quantity += 1;

    } else {

      cart.push({
        ...product,
        quantity: 1,
      });
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    window.dispatchEvent(
      new Event("cartUpdated")
    );

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

      {/* Header */}
      <div className="fp-header">

        <p className="fp-header__tag">
          Men's Collection
        </p>

        <h1 className="fp-header__title">
          Men Dresses
        </h1>

        <p className="fp-header__sub">
          Stylish and comfortable outfits
          for everyday and formal wear
        </p>

      </div>

      <div className="fp-toolbar">

        <p className="fp-toolbar__count">
          {products.length} Products
        </p>

        <select
          className="fp-sort"
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value)
          }
        >

          <option value="default">
            Sort by: Featured
          </option>

          <option value="low">
            Price: Low to High
          </option>

          <option value="high">
            Price: High to Low
          </option>

        </select>

      </div>

      <div className="fp-grid">

        {products.map(product => (

          <div
            className="fp-card"
            key={product.id}
          >

            <Link
              to={`/men/${product.id}`}
              className="fp-card__img-wrap"
            >

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
                className={`fp-wishlist ${
                  wishlist.includes(product.id)
                    ? "fp-wishlist--active"
                    : ""
                }`}
                    onClick={e => {
  e.preventDefault();
  toggleWishlist(product.id, product); 
}}
                aria-label="Wishlist"
              >

                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill={
                    wishlist.includes(product.id)
                      ? "currentColor"
                      : "none"
                  }
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
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

export default MenDress;