import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./whishlist.css";

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistItems(saved);
  }, []);

  const removeFromWishlist = (id) => {
    const updated = wishlistItems.filter(item => item.id !== id);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    window.dispatchEvent(new Event("wishlistUpdated"));
    setWishlistItems(updated);
  };

  const addToCart = (product) => {
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

  return (
    <div className="wishlist-page">

      <div className="wishlist-header">
        <h1>My Wishlist</h1>
        <p>{wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"}</p>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="wishlist-empty">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <h3>Your wishlist is empty</h3>
          <p>Add items you love to your wishlist</p>
          <button onClick={() => navigate("/TwoPiece")}>Start Shopping</button>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlistItems.map(item => (
            <div key={item.id} className="wishlist-card">

              <div className="wishlist-card__img-wrap">
                <img src={item.img} alt={item.name} />
                <button
                  className="wishlist-card__remove"
                  onClick={() => removeFromWishlist(item.id)}
                  aria-label="Remove"
                >
                  ✕
                </button>
              </div>

              <div className="wishlist-card__info">
                <h3>{item.name}</h3>
                <p>Rs. {Number(item.price).toLocaleString()}</p>
                <button
                  className="wishlist-card__btn"
                  onClick={() => addToCart(item)}
                >
                  Add to Cart
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default Wishlist;