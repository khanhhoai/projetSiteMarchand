import React, { useEffect, useState } from "react";
import axios from "axios";
import "./my-orders.css";

export const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const userId = JSON.parse(localStorage.getItem("user")).id;

  useEffect(() => {
    if (userId) {
      const fetchOrders = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/orders/${userId}`
          );
          console.log(response.data);
          setOrders(response.data);
        } catch (error) {
          console.error("Failed to fetch orders:", error);
        }
      };
  
      fetchOrders();
    }
  }, []);

  console.log(orders);

  const handleCancelProduct = async (orderId, productId) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/orders/${orderId}/status`,
        {status: "canceled", productId}
      );
      console.log(response.data);
      if (response.data.success) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId
              ? {
                  ...order,
                  products: order.products.map((product) =>
                    product.id_product === productId
                      ? { ...product, status: "canceled" }
                      : product
                  ),
                }
              : order
          )
        );
        alert("Product canceled successfully.");
      } else {
        alert("Failed to cancel product: " + response.data.message);
      }
    } catch (error) {
      console.error("Failed to cancel product:", error);
      alert("Failed to cancel product.");
    }
  };

  return (
    <div>
      <h1>My Orders</h1>
      {orders.length === 0 ? (
        <p>You have no orders.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="order">
            <h3>Order #{order.id}</h3>
            <ul class="order-ul">
              {order.products.map((product) => (
                <li class="order-li" key={product.id_product}>
                  Product name: <b>{product.name}</b> - Quantity: <b>{product.quantity}</b> -
                  Price: <b>${product.price}</b> - Status: <b>{product.status}</b> - Seller <b>{product.sellerName}</b>
                  {product.status === "pending" && (
                    <button
                      onClick={() => handleCancelProduct(order.id, product.id_product)}
                      className="cancel-button"
                    >
                      Cancel
                    </button>
                  )}
                </li>
              ))}
            </ul>
            <p>Total Price: <b>${order.totalPrice}</b></p>
          </div>
        ))
      )}
    </div>
  );
};
