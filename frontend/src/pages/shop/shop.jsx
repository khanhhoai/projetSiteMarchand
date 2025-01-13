// import React from "react";
// import { PRODUCTS } from "../../products";
// import { Product } from "./product";
// import "./shop.css";

// export const Shop = () => {
  
//   return (
//       <div className="product-container">
//         {PRODUCTS.map((product) => (
//           <Product data={product} /> //user.role()
//         ))}
//       </div>
//   );
// };

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./shop.css";
// import { Product } from "./product"; // Import component Product

// export const Shop = () => {
//   const [products, setProducts] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Lấy dữ liệu từ API
//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/products")
//       .then((response) => {
//         setProducts(response.data.products);  // Giả sử response chứa dữ liệu products
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError("Error fetching products");
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p>Loading products...</p>;

//   return (
//     <div className="product-container">
//       {error && <p>{error}</p>}
//       {products.length > 0 ? (
//         products.map((product) => (
//           <Product key={product.id} data={product} /> // Truyền dữ liệu sản phẩm vào component Product
//         ))
//       ) : (
//         <p>No products available</p>
//       )}
//     </div>
//   );
// };

