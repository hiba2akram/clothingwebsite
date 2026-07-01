

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./orderSuccess.css";

function OrderSuccess() {
  const navigate = useNavigate();
  const [count, setCount] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prev => {
        if (prev === 1) {
          clearInterval(timer);
          navigate("/");
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="os-page">

      <div className="os-icon">
        <svg className="os-check" viewBox="0 0 52 52">
          <circle className="os-check__circle" cx="26" cy="26" r="25" fill="none" />
          <path className="os-check__tick" fill="none" d="M14 27l8 8 16-16" />
        </svg>
      </div>

      <h1 className="os-title">Order Placed!</h1>
      <p className="os-sub">
        Thank you for shopping with <strong>Fitzo Studio</strong>. <br />
        Your order has been received and is being processed.
      </p>

      <div className="os-steps">
        <div className="os-step">
          <div className="os-step__num">1</div>
          <div className="os-step__info">
            <p className="os-step__title">Order Confirmed</p>
            <p className="os-step__desc">We've received your order</p>
          </div>
        </div>
        <div className="os-step__connector" />
        <div className="os-step">
          <div className="os-step__num">2</div>
          <div className="os-step__info">
            <p className="os-step__title">Processing</p>
            <p className="os-step__desc">We're preparing your items</p>
          </div>
        </div>
        <div className="os-step__connector" />
        <div className="os-step">
          <div className="os-step__num">3</div>
          <div className="os-step__info">
            <p className="os-step__title">Out for Delivery</p>
            <p className="os-step__desc">Your order is on its way</p>
          </div>
        </div>
        <div className="os-step__connector" />
        <div className="os-step">
          <div className="os-step__num">4</div>
          <div className="os-step__info">
            <p className="os-step__title">Delivered</p>
            <p className="os-step__desc">Enjoy your purchase!</p>
          </div>
        </div>
      </div>

      <div className="os-actions">
        <button className="os-btn os-btn--primary" onClick={() => navigate("/")}>
          Continue Shopping
        </button>
        <button className="os-btn os-btn--outline" onClick={() => navigate("/myOrders")}>
          View My Orders
        </button>
      </div>

      <p className="os-redirect">
        Redirecting to home in <strong>{count}</strong> seconds...
      </p>

    </div>
  );
}

export default OrderSuccess;
