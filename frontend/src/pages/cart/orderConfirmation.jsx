import React from "react";
import { useNavigate } from "react-router-dom";
import "./checkout.css";

export const OrderConfirmation = () => {
  const navigate = useNavigate();

  return (
    <div className="order-confirmation">
      <h1>Thank you for your order!</h1>
      <p>Your order has been reserved successfully.</p>
      <button onClick={() => navigate("/")}>Return to Shop</button>
    </div>
  );
};
