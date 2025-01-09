import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "./cart.css"; // Reusing the same CSS for consistency

export const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Access the product details passed via the "Buy Now" button
  const product = location.state?.product;

  if (!product) {
    // If no product is passed, redirect back to the shop
    navigate("/");
    return null;
  }

  const handlePayment = () => {
    alert("Proceeding to payment...");
    navigate("/"); // Redirect back to the shop or payment gateway
  };

  return (
    <div className="cart">
      <div>
        <h1>Checkout</h1>
      </div>
      <div className="cart">
        {/* Render the product details */}
        <div className="cartItem">
          <img src={product.productImage} alt={product.productName} />
          <div className="description">
            <p>
              <b>{product.productName}</b>
            </p>
            <p>Price: ${product.price}</p>
            <div className="countHandler">
              <p>Quantity: 1</p>
            </div>
          </div>
        </div>
      </div>
      <div className="checkout">
        <p> Total: ${product.price} </p>
        <button onClick={() => navigate("/")}> Continue Shopping </button>
        <button onClick={handlePayment}> Proceed to Payment </button>
      </div>
    </div>
  );
}; 