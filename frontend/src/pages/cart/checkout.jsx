import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./checkout.css";

export const Checkout = () => {
  const { cartItems, getTotalCartAmount, products, emptyCart } =
    useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const navigate = useNavigate();

  const handleReserveOrder = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.id;

      const orderProducts = products
        .filter((product) => cartItems[product.id] > 0)
        .map((product) => ({
          id_product: product.id,
          name: product.name,
          quantity: cartItems[product.id],
          price: product.price,
          id_seller: product.sellerId,
          status: "pending",
        }));

      await axios.post("http://localhost:5000/orders", {
        userId,
        products: orderProducts,
        totalPrice: totalAmount,
      });

      emptyCart();

      navigate("/my-orders");
    } catch (error) {
      console.error("Failed to create order:", error);
      alert("Something went wrong. Please try again!");
    }
  };

  return (
    <div className="checkout">
      <h1>Order Summary</h1>

      <div className="order-details">
        {products.map((product) => {
          if (cartItems[product.id] > 0) {
            return (
              <div key={product.id} className="order-item">
                <img
                  src={
                    product.image || "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"
                  }
                  alt={product.name}
                  className="product-image"
                />
                <p>{product.name}</p>
                <p>Quantity: {cartItems[product.id]}</p>
                <p>Price: ${product.price * cartItems[product.id]}</p>
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className="total">
        <h2>Total Amount: ${totalAmount}</h2>
      </div>

      <div className="actions">
        <button onClick={() => navigate("/cart")}>Back to Cart</button>
        <button onClick={handleReserveOrder}>Confirm Order</button>
      </div>
    </div>
  );
};
