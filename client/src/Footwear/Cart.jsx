import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./footwear.css";

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);
  }, []);

  const updateCart = (updatedCart) => {
  setCart(updatedCart);
  localStorage.setItem("cart", JSON.stringify(updatedCart));

  // 🔥 ADD THIS LINE
  window.dispatchEvent(new Event("cartUpdated"));
};

  // Increase quantity
  const increaseQuantity = (index) => {
    const updated = [...cart];
    updated[index].quantity += 1;
    updateCart(updated);
  };

  // Decrease quantity
  const decreaseQuantity = (index) => {
    const updated = [...cart];
    if (updated[index].quantity > 1) {
      updated[index].quantity -= 1;
      updateCart(updated);
    }
  };

  // Remove item
  const removeItem = (index) => {
    const updated = [...cart];
    updated.splice(index, 1);
    updateCart(updated);
  };

  // Total Price
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container mt-5">
      <h2 className="mb-4">🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map((item, index) => (
  <div className="cart-item-pro">

    {/* Image */}
    <img
  src={item.img || item.img1 || item.img2 || (item.images && item.images[0])}
  alt={item.name}
  className="cart-img"
/>

    {/* Info */}
    <div className="cart-info">
      <h5>{item.name}</h5>
      <p>Rs. {item.price}</p>

      {/* Quantity (PRO STYLE) */}
      <div className="quantity-container">
        <button className="qty-btn" onClick={() => decreaseQuantity(index)}>−</button>
        <span className="qty-value">{item.quantity}</span>
        <button className="qty-btn" onClick={() => increaseQuantity(index)}>+</button>
      </div>
    </div>

    {/* Remove */}
    <button className="remove-btn" onClick={() => removeItem(index)}>
      ❌
    </button>


            </div>
          ))}

          {/* Total Section */}
          <div className="text-end mt-4">
            <h4>Total: Rs. {totalPrice}</h4>
            <button className="btn btn-dark btn-lg mt-2">
              Checkout
            </button>
          </div>
        </>
      )}

      <Link to="/footwear" className="btn btn-outline-dark mt-4">
        Continue Shopping
      </Link>
    </div>
  );
}

export default Cart;