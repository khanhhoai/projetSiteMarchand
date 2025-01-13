import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { CartItem } from "./cart-item";
import { useNavigate } from "react-router-dom";
import "./cart.css";

export const Cart = () => {
  const { cartItems, products, getTotalCartAmount } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const navigate = useNavigate();

  // Function to handle checkout process
  const handleCheckout = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      // If no user is logged in, redirect to login page with state to redirect back
      navigate("/login", { state: { from: "/cart" } });
    } else {
      // If user is logged in, proceed to checkout
      navigate("/checkout", {
        state: {
          cartItems,
          totalAmount,
        },
      });
    }
  };

  return (
    <div className="cart">
      <div>
        <h1>Your Cart Items</h1>
      </div>
      <div className="cart-items">
        {products.map((product) => {
          if (cartItems[product.id] > 0) {
            return <CartItem key={product.id} data={product} />;
          }
          return null;
        })}
      </div>

      {totalAmount > 0 ? (
        <div className="checkout_class">
          <p> Subtotal: ${totalAmount} </p>
          <button onClick={() => navigate("/")}> Continue Shopping </button>
          <button onClick={handleCheckout}> Checkout </button>
        </div>
      ) : (
        <h1> Your Shopping Cart is Empty</h1>
      )}
    </div>
  );
};
