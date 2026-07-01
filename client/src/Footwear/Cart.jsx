import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { placeOrder } from "../services/orderServices";
import "./Cart.css";

const CART_KEY = "cart";

const getCart = () => JSON.parse(localStorage.getItem(CART_KEY)) || [];
const saveCart = (items) => {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("cartUpdated"));
};
const clearCart = () => {
  localStorage.removeItem(CART_KEY);
  window.dispatchEvent(new Event("cartUpdated"));
};
export const addToCart = (product) => {
  const cart = getCart();

  const productId = Number(product.ProductID ?? product.id ?? product.ID);
  const productName = product.ProductName ?? product.name ?? product.title ?? "Unnamed";
  const productPrice = Number(product.Price ?? product.price ?? 0);
  const productImg = product.img ?? product.image ?? product.ImageURL ?? "";

  if (!productId || isNaN(productId)) {
    console.warn("addToCart: missing ProductID for", product);
    return;
  }

  const index = cart.findIndex((item) => item.id === productId);

  if (index !== -1) {
    cart[index].quantity += 1;
  } else {
    cart.push({
      id: productId,
      name: productName,
      price: productPrice,
      quantity: 1,
      img: productImg,
    });
  }

  saveCart(cart);
};
function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setCart(getCart());
    const update = () => setCart(getCart());
    window.addEventListener("cartUpdated", update);
    return () => window.removeEventListener("cartUpdated", update);
  }, []);

  const updateCart = (updated) => { setCart(updated); saveCart(updated); };
  const increase = (i) => { const u = [...cart]; u[i].quantity += 1; updateCart(u); };
  const decrease = (i) => { const u = [...cart]; if (u[i].quantity > 1) { u[i].quantity -= 1; updateCart(u); } };
  const remove   = (i) => { const u = [...cart]; u.splice(i, 1); updateCart(u); };

  const subtotal    = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal >= 5000 ? 0 : 200;
  const total       = subtotal + deliveryFee;

  const handleCheckout = async () => {
    const token = localStorage.getItem("token");
    if (cart.length === 0) return;
    setLoading(true);

    const cartItems = cart.map((item) => ({
      ProductID: item.id,
      price: item.price,
      quantity: item.quantity,
    }));

    const orderData = {
      totalAmount: total,
      deliveryFee,
      address: "Lahore",
      city: "Lahore",
      postalCode: "54000",
      cartItems,
    };

    try {
      const data = await placeOrder(orderData, token);
      if (!data.success) { alert(data.message || "Order failed"); return; }
      navigate("/checkout");
    } catch (err) {
      console.error(err);
      alert("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <div className="cart-empty__icon">
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
        </div>
        <h2 className="cart-empty__title">Your cart is empty</h2>
        <p className="cart-empty__sub">Looks like you haven't added anything yet.</p>
        <Link to="/fabrics" className="cart-empty__btn">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">

      <div className="cart-header">
        <h1 className="cart-header__title">Shopping Cart</h1>
        <p className="cart-header__count">{cart.reduce((s, i) => s + i.quantity, 0)} items</p>
      </div>

      <div className="cart-layout">

        <div className="cart-items">

          <div className="cart-labels">
            <span>Product</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Total</span>
            <span></span>
          </div>

          {cart.map((item, i) => (
            <div className="cart-row" key={i}>

              <div className="cart-row__product">
                <div className="cart-row__img">
                  {item.img
                    ? <img src={item.img} alt={item.name} />
                    : <div className="cart-row__img-placeholder" />}
                </div>
                <div className="cart-row__info">
                  <p className="cart-row__name">{item.name}</p>
                </div>
              </div>

              <p className="cart-row__price">Rs. {item.price.toLocaleString()}</p>

              <div className="cart-row__qty">
                <button onClick={() => decrease(i)}>−</button>
                <span>{item.quantity}</span>
                <button onClick={() => increase(i)}>+</button>
              </div>

              <p className="cart-row__total">Rs. {(item.price * item.quantity).toLocaleString()}</p>

              <button className="cart-row__remove" onClick={() => remove(i)} aria-label="Remove">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

            </div>
          ))}

          <Link to="/fabrics" className="cart-continue">← Continue Shopping</Link>

        </div>

        <div className="cart-summary">
          <h2 className="cart-summary__title">Order Summary</h2>

          <div className="cart-summary__lines">
            <div className="cart-summary__line">
              <span>Subtotal</span>
              <span>Rs. {subtotal.toLocaleString()}</span>
            </div>
            <div className="cart-summary__line">
              <span>Delivery</span>
              <span>{deliveryFee === 0 ? <span className="cart-free">Free</span> : `Rs. ${deliveryFee}`}</span>
            </div>
            {deliveryFee > 0 && (
              <p className="cart-summary__free-hint">
                Add Rs. {(5000 - subtotal).toLocaleString()} more for free delivery
              </p>
            )}
            <div className="cart-summary__divider" />
            <div className="cart-summary__line cart-summary__line--total">
              <span>Total</span>
              <span>Rs. {total.toLocaleString()}</span>
            </div>
          </div>

          <button
            className="cart-summary__btn"
            onClick={handleCheckout}
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Proceed to Checkout"}
          </button>

          <div className="cart-trust">
            <div className="cart-trust__item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              Secure Checkout
            </div>
            <div className="cart-trust__item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
              </svg>
              Easy Returns
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Cart;
