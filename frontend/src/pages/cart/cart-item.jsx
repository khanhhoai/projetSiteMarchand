// import React, { useContext } from "react";
// import { ShopContext } from "../../context/shop-context";

// export const CartItem = (props) => {
//   const { id, productName, price, productImage } = props.data;
//   const { cartItems, addToCart, removeFromCart, updateCartItemCount } =
//     useContext(ShopContext);

//   return (
//     <div className="cartItem">
//       <img src={productImage} />
//       <div className="description">
//         <p>
//           <b>{productName}</b>
//         </p>
//         <p> Price: ${price}</p>
//         <div className="countHandler">
//           <button onClick={() => removeFromCart(id)}> - </button>
//           <input
//             value={cartItems[id]}
//             onChange={(e) => updateCartItemCount(Number(e.target.value), id)}
//           />
//           <button onClick={() => addToCart(id)}> + </button>
//         </div>
//       </div>
//     </div>
//   );
// };

import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";

export const CartItem = (props) => {
  const { id, productName, price, productImage } = props.data;
  const { cartItems, addToCart, removeFromCart, updateCartItemCount } =
    useContext(ShopContext);

  const handleInputChange = (e) => {
    const value = Number(e.target.value);
    if (value >= 0) {
      updateCartItemCount(value, id);
    }
  };

  return (
    <div className="cartItem">
      {/* Hiển thị ảnh sản phẩm hoặc ảnh mặc định */}
      <img
        src={productImage || "https://via.placeholder.com/150"}
        alt={productName}
      />
      <div className="description">
        <p>
          <b>{productName}</b>
        </p>
        <p>Price: ${price}</p>
        <div className="countHandler">
          <button onClick={() => removeFromCart(id)}> - </button>
          <input
            type="number"
            value={cartItems[id]}
            min="0"
            onChange={handleInputChange}
          />
          <button onClick={() => addToCart(id)}> + </button>
        </div>
      </div>
    </div>
  );
};
