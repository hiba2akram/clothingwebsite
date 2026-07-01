import React, { useState, useEffect } from "react";
import { placeOrder } from "../services/orderServices";
import { useNavigate } from "react-router-dom";
import "./checkout.css";

const CART_KEY = "cart";
const getCart = () => JSON.parse(localStorage.getItem(CART_KEY)) || [];
const clearCart = () => {
  localStorage.removeItem(CART_KEY);
  window.dispatchEvent(new Event("cartUpdated"));
};

function Checkout() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "",
    phone: "", address: "", confirmAddress: "",
    city: "", postalCode: "",
  });

  useEffect(() => {
    const update = () => setCart(getCart());
    update();
    window.addEventListener("cartUpdated", update);
    return () => window.removeEventListener("cartUpdated", update);
  }, []);

  const subtotal    = cart.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0), 0);
  const deliveryFee = subtotal >= 5000 ? 0 : 200;
  const total       = subtotal + deliveryFee;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const e = {};
    if (!form.firstName.trim())  e.firstName      = "Required";
    if (!form.lastName.trim())   e.lastName       = "Required";
    if (!form.email.trim())      e.email          = "Required";
    if (!form.phone.trim())      e.phone          = "Required";
    if (!form.address.trim())    e.address        = "Required";
    if (form.address !== form.confirmAddress) e.confirmAddress = "Address does not match";
    if (!form.city.trim())       e.city           = "Required";
    if (!form.postalCode.trim()) e.postalCode     = "Required";
    return e;
  };

 const handlePlaceOrder = async () => {
  if (cart.length === 0) return;

  const e = validate();
  if (Object.keys(e).length > 0) {
    setErrors(e);
    return;
  }

  setLoading(true);

  const token = localStorage.getItem("token");

  const orderData = {
    userId: null,
    fullName: `${form.firstName} ${form.lastName}`.trim() || "Guest Customer",
    email: form.email || null,
    phone: form.phone || null,
    address: form.address,
    city: form.city,
    postalCode: form.postalCode,
    totalAmount: total,
    deliveryFee,
    cartItems: cart.map(item => ({
      ProductID: item.productId,
      price: item.price,
      quantity: item.quantity,
    })),
  };

  try {
    const res = await placeOrder(orderData, token);

    if (!res.success) {
      alert(res.message);
      return;
    }

    clearCart();
    setCart([]);
    navigate("/order-success");

  } catch (err) {
    console.error(err);
    alert("Server error");
  } finally {
    setLoading(false);
  }
};

  

  return (
    <div className="co-page">

      <div className="co-header">
        <h1 className="co-header__title">Checkout</h1>
        <div className="co-steps">
          <span className="co-step co-step--done">Cart</span>
          <span className="co-step__line" />
          <span className="co-step co-step--active">Details</span>
          <span className="co-step__line" />
          <span className="co-step">Confirmation</span>
        </div>
      </div>

      <div className="co-layout">

        <div className="co-form-wrap">
          <h2 className="co-section-title">Billing Details</h2>

          <div className="co-row">
            <div className="co-field">
              <label>First Name</label>
              <input name="firstName" placeholder="e.g. Hiba" value={form.firstName} onChange={handleChange} className={errors.firstName ? "co-input--error" : ""} />
              {errors.firstName && <span className="co-error">{errors.firstName}</span>}
            </div>
            <div className="co-field">
              <label>Last Name</label>
              <input name="lastName" placeholder="e.g. Last-name" value={form.lastName} onChange={handleChange} className={errors.lastName ? "co-input--error" : ""} />
              {errors.lastName && <span className="co-error">{errors.lastName}</span>}
            </div>
          </div>

          <div className="co-row">
            <div className="co-field">
              <label>Email Address</label>
              <input name="email" type="email" placeholder="abc@gmail.com" value={form.email} onChange={handleChange} className={errors.email ? "co-input--error" : ""} />
              {errors.email && <span className="co-error">{errors.email}</span>}
            </div>
            <div className="co-field">
              <label>Phone Number</label>
              <input name="phone" placeholder="+92 300 0000000" value={form.phone} onChange={handleChange} className={errors.phone ? "co-input--error" : ""} />
              {errors.phone && <span className="co-error">{errors.phone}</span>}
            </div>
          </div>

          <div className="co-divider" />
          <h2 className="co-section-title">Delivery Address</h2>

          <div className="co-field co-field--full">
            <label>Street Address</label>
            <input name="address" placeholder="House no, Street, Area" value={form.address} onChange={handleChange} className={errors.address ? "co-input--error" : ""} />
            {errors.address && <span className="co-error">{errors.address}</span>}
          </div>

          <div className="co-field co-field--full">
            <label>Confirm Address</label>
            <input name="confirmAddress" placeholder="Re-enter your address" value={form.confirmAddress} onChange={handleChange} className={errors.confirmAddress ? "co-input--error" : ""} />
            {errors.confirmAddress && <span className="co-error">{errors.confirmAddress}</span>}
          </div>

          <div className="co-row">
            <div className="co-field">
              <label>City</label>
              <input name="city" placeholder="city" value={form.city} onChange={handleChange} className={errors.city ? "co-input--error" : ""} />
              {errors.city && <span className="co-error">{errors.city}</span>}
            </div>
            <div className="co-field">
              <label>Postal Code</label>
              <input name="postalCode" placeholder="54000" value={form.postalCode} onChange={handleChange} className={errors.postalCode ? "co-input--error" : ""} />
              {errors.postalCode && <span className="co-error">{errors.postalCode}</span>}
            </div>
          </div>

          <div className="co-payment-note">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
            </svg>
            <p>Payment method: <strong>Cash on Delivery</strong></p>
          </div>

        </div>

        <div className="co-summary">
          <h2 className="co-summary__title">Order Summary</h2>

          <div className="co-summary__items">
            {cart.map((item, i) => (
              <div className="co-summary__item" key={i}>
                <div className="co-summary__item-img">
                  {item.img
                    ? <img src={item.img} alt={item.name} />
                    : <div className="co-summary__item-placeholder" />
                  }
                  <span className="co-summary__qty-badge">{item.quantity}</span>
                </div>
                <div className="co-summary__item-info">
                  <p className="co-summary__item-name">{item.name}</p>
                </div>
                <p className="co-summary__item-price">Rs. {(item.price * item.quantity).toLocaleString()}</p>
              </div>
            ))}
          </div>

          <div className="co-summary__totals">
            <div className="co-summary__line">
              <span>Subtotal</span>
              <span>Rs. {subtotal.toLocaleString()}</span>
            </div>
            <div className="co-summary__line">
              <span>Delivery</span>
              <span>{deliveryFee === 0 ? <span className="co-free">Free</span> : `Rs. ${deliveryFee}`}</span>
            </div>
            <div className="co-summary__divider" />
            <div className="co-summary__line co-summary__line--total">
              <span>Total</span>
              <span>Rs. {total.toLocaleString()}</span>
            </div>
          </div>

          <button className="co-place-btn" onClick={handlePlaceOrder} disabled={loading || cart.length === 0}>
            {loading ? "Placing Order..." : "Place Order"}
          </button>

          <div className="co-trust">
            <div className="co-trust__item">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              Secure Checkout
            </div>
            <div className="co-trust__item">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
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

export default Checkout;
