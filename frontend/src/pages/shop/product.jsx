import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { ShopContext } from "../../context/shop-context";
import "./product.css";

export const Product = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [newStock, setNewStock] = useState(0);

  const location = useLocation();
  const { addToCart, cartItems } = useContext(ShopContext);
  const navigate = useNavigate();
  const isAdmin = user && user.role === "admin";
  const isSeller = user && user.role === "seller";

  // Fetch logged-in user details
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user")) || null;
    setUser(loggedInUser);
  }, [location]);

  // Fetch products
  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((response) => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          setProducts(response.data);
        } else {
          setError("No products found.");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching products");
        setLoading(false);
      });
  }, []);

  // Fetch orders for seller
  useEffect(() => {
    if (isSeller) {
      axios
        .get(`http://localhost:5000/orders/seller/${user.id}`)
        .then((response) => {
          setOrders(response.data);
        })
        .catch((err) => {
          setError("Error fetching orders");
        });
    }
  }, [isSeller, user]);

  // Handle stock update for Admin
  const handleUpdateStock = (id, stock) => {
    setCurrentProduct(id);
    setNewStock(stock);
    setShowPopup(true);
  };

  const handleSaveStock = () => {
    axios
      .put(`http://localhost:5000/products/${currentProduct}`, {
        stock: newStock,
      })
      .then((response) => {
        alert("Stock updated successfully!");
        setShowPopup(false);
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === currentProduct
              ? { ...product, stock: newStock }
              : product
          )
        );
      })
      .catch((err) => {
        alert("Failed to update stock");
      });
  };

  const handleBuyNow = (id) => {
    addToCart(id);
    navigate("/cart");
  };
  const handleValidateProduct = (orderId) => {
    const status = "validated";

    axios
      .put(`http://localhost:5000/orders/${orderId}/status`, {
        status,
        sellerId: user.id,
      })
      .then((response) => {
        if (response.data.success) {
          setOrders((prevOrders) =>
            prevOrders.map((order) => {
              if (order.id === orderId) {
                const newProducts = order.products.map((product) => ({
                  ...product,
                  status: "validated",
                }));
                order.products = newProducts;
              }
              return order;
            })
          );
          alert("Product status updated to validated!");
        } else {
          alert("Failed to update product status: " + response.data.message);
        }
      })
      .catch((err) => {
        alert("Failed to update product status: " + err.message);
      });
  };

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="product-container">
      {error && <p>{error}</p>}

      {/* Seller View - Show orders */}
      {isSeller ? (
        <div className="orders-list">
          {Array.isArray(orders) && orders.length > 0 ? (
            orders.map((order) => {
              const isPendingOrder = order.products.some(
                (product) => product.status == "pending"
              );
              return (
                <div key={order.id} className="product">
                  <div className="description">
                    <p>
                      <b>Order #{order.id}</b>
                    </p>
                    <p>
                      <b>Client {order.username}</b>
                    </p>
                    <div>
                      {order.products.map((product) => (
                        <p key={product.id_product}>
                          Product name: {product.name} - Quantity:{" "}
                          {product.quantity}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className="buttonContainer_class">
                    {isPendingOrder ? (
                      <button
                        className="validateOrderBttn"
                        onClick={() => handleValidateProduct(order.id)}
                      >
                        Validate Order
                      </button>
                    ) : (
                      <button className="validatedBttn" disabled>
                        Validated
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <p>No orders found for you.</p>
          )}
        </div>
      ) : (
        <div className="products-list">
          {Array.isArray(products) && products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="product">
                <img
                  src={product.image || "default-image.jpg"}
                  alt={product.name}
                  style={{ width: "150px", height: "150px" }}
                />
                <div className="description">
                  <p>
                    <b>{product.name}</b>
                  </p>
                  <p>${product.price}</p>
                  {isAdmin && <p>Stock: {product.stock}</p>}
                </div>
                <div className="buttonContainer_class">
                  {isAdmin ? (
                    <button
                      className="updateStockBttn"
                      onClick={() =>
                        handleUpdateStock(product.id, product.stock)
                      }
                    >
                      Update Stock
                    </button>
                  ) : (
                    <>
                      <button
                        className="addToCartBttn"
                        onClick={() => addToCart(product.id)}
                      >
                        Add To Cart{" "}
                        {cartItems[product.id] > 0 && (
                          <> ({cartItems[product.id]})</>
                        )}
                      </button>
                      <button
                        className="buyBttn_class"
                        onClick={() => handleBuyNow(product.id)}
                      >
                        Buy Now
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
      )}

      {/* Pop-up Modal for Admin to Update Stock */}
      {showPopup && (
        <div className="popup-container">
          <div className="popup">
            <h3>Update Stock</h3>
            <label>
              New Stock Quantity:
              <input
                type="number"
                value={newStock}
                onChange={(e) => setNewStock(e.target.value)}
              />
            </label>
            <button onClick={handleSaveStock}>Save</button>
            <button onClick={() => setShowPopup(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};
