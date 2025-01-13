import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";

export const CartItem = (props) => {
  console.log(props);
  const { data } = props;
  const { cartItems, addToCart, removeFromCart, updateCartItemCount } =
    useContext(ShopContext);

  if (!data) return <p>Product not found</p>;

  const { id, name, price, image, stock } = data;

  const handleInputChange = (e) => {
    const value = Number(e.target.value);
    if (value >= 0) {
      updateCartItemCount(value, id);
    }
  };

  return (
    <div className="cartItem">
      <img src={image || "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"} alt={name} />
      <div className="description">
        <p>
          <b>{name}</b>
        </p>
        <p>Price: ${price}</p>
        <div className="countHandler">
          <button onClick={() => removeFromCart(id)}> - </button>
          <input
            type="number"
            value={cartItems[id] || 0}
            min="0"
            max={stock}
            onChange={handleInputChange}
          />
          <button onClick={() => addToCart(id)}> + </button>
        </div>
      </div>
    </div>
  );
};
