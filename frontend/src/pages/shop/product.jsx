import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { useNavigate } from "react-router-dom";

export const Product = (props) => {
  const { id, productName, price, productImage } = props.data;
  const { addToCart, cartItems } = useContext(ShopContext); // Removed buyNow
  const navigate = useNavigate();

  const cartItemCount = cartItems[id];
  
  const handleBuyNow = () => {
    addToCart(id); // Use the correct id from props.data
    navigate("/cart"); // Navigate to the cart page
  };

  return (
    <div className="product">
      <img src={productImage} alt={productName} />
      <div className="description">
        <p>
          <b>{productName}</b>
        </p>
        <p> ${price}</p>
      </div>
      <div className="buttonContainer">
      <button className="addToCartBttn" onClick={() => addToCart(id)}>
        Add To Cart {cartItemCount > 0 && <> ({cartItemCount})</>}
      </button>
      <button className="buyBttn" onClick={handleBuyNow}>
        Buy Now
      </button>
      </div>
    </div>
  );
};
