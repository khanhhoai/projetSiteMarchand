import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const ShopContext = createContext(null);

const getDefaultCart = (products) => {
  let cart = {};
  products.forEach((product) => {
    cart[product.id] = 0;
  });
  return cart;
};

export const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((response) => {
        setProducts(response.data);
        setCartItems(getDefaultCart(response.data));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = products.find((product) => product.id === Number(item));
        totalAmount += cartItems[item] * itemInfo.price;
      }
    }
    return totalAmount;
  };

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const emptyCart = () => {
    setCartItems({});
  };

  const updateCartItemCount = (newAmount, itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  const reserveOrder = () => {
    const orderDetails = Object.keys(cartItems)
      .filter((id) => cartItems[id] > 0)
      .map((id) => ({
        id: id,
        quantity: cartItems[id],
        ...products.find((product) => product.id === Number(id)),
        status: "pending", // Default status
      }));

    setOrders([...orders, ...orderDetails]); // Add order to orders list
    setCartItems({}); // Clear cart
  };

  const checkout = () => {
    setCartItems(getDefaultCart(products));
  };

  const contextValue = {
    products,
    cartItems,
    addToCart,
    updateCartItemCount,
    removeFromCart,
    getTotalCartAmount,
    reserveOrder,
    checkout,
    loading,
    emptyCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
